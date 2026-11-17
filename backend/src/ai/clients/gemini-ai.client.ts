import {
  GoogleGenAI,
} from "@google/genai";

import {
  generatedMockExamJsonSchema,
} from "../schemas/generated-question.schema.js";

import { TransientAIError } from "../../errors/transient-ai.error.js";

import type {
  AIClient,
} from "./ai-client.js";

// Gerar 10 questões pode levar mais de 30s; o limite por tentativa precisa
// acomodar isso sem ultrapassar a espera de 5 minutos do aplicativo.
const AI_TIMEOUT_MS =
  Number(process.env.GEMINI_TIMEOUT_MS) ||
  90_000;

const MAX_ATTEMPTS =
  3;

const FALLBACK_MODEL =
  process.env.GEMINI_FALLBACK_MODEL ??
  "gemini-3.6-flash";

const INITIAL_RETRY_DELAY_MS =
  Number(process.env.GEMINI_RETRY_DELAY_MS ?? 1_000);

function sleep(
  milliseconds: number
) {
  return new Promise<void>(
    (resolve) => {
      setTimeout(
        resolve,
        milliseconds
      );
    }
  );
}

function getStatusCode(
  error: unknown
) {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status ===
      "number"
  ) {
    return error.status;
  }

  return undefined;
}

function getTransientErrorCode(
  error: unknown
) {
  const status = getStatusCode(error);

  if (status === 429) return "RATE_LIMIT" as const;
  if ([500, 502, 503, 504].includes(status ?? 0)) {
    return "UNAVAILABLE" as const;
  }

  if (
    error instanceof Error &&
    (error.name === "TimeoutError" || error.name === "AbortError")
  ) {
    return "TIMEOUT" as const;
  }

  if (
    error instanceof TypeError ||
    (error instanceof Error &&
      /fetch failed|failed to fetch|network|ECONN|ENOTFOUND|EAI_AGAIN|socket|connection reset|connection refused/i.test(error.message))
  ) {
    return "CONNECTION" as const;
  }

  return null;
}

function isRetryableError(
  error: unknown
) {
  return getTransientErrorCode(error) !== null;
}

export class GeminiAIClient
  implements AIClient
{
  private readonly client:
    GoogleGenAI;

  private readonly model:
    string;

  constructor() {
    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY não configurada."
      );
    }

    this.client =
      new GoogleGenAI({
        apiKey,
      });

    this.model =
      process.env.GEMINI_MODEL ??
      "gemini-3.8-flash";
  }

  async generate(
    prompt: string
  ): Promise<string> {
    try {
      return await this.generateWithModel(prompt, this.model);
    } catch (error) {
      if (
        !(error instanceof TransientAIError) ||
        this.model === FALLBACK_MODEL
      ) {
        throw this.toUserFacingError(error);
      }

      console.warn(
        `Modelo ${this.model} indisponível (${error.code}); alternando para ${FALLBACK_MODEL}.`,
      );

      try {
        return await this.generateWithModel(prompt, FALLBACK_MODEL);
      } catch (fallbackError) {
        throw this.toUserFacingError(fallbackError);
      }
    }
  }

  private async generateWithModel(
    prompt: string,
    model: string,
  ): Promise<string> {
    for (
      let attempt = 1;
      attempt <= MAX_ATTEMPTS;
      attempt++
    ) {
      try {
        const response =
          await this.client.models.generateContent({
            model:
              model,

            contents:
              prompt,

            config: {
              responseMimeType:
                "application/json",

              responseJsonSchema:
                generatedMockExamJsonSchema,

              abortSignal:
                AbortSignal.timeout(
                  AI_TIMEOUT_MS
                ),
            },
          });

        const output =
          response.text;

        if (!output) {
          throw new Error(
            "A IA não retornou conteúdo."
          );
        }

        return output;
      } catch (error) {
        console.error(
          `Tentativa ${attempt}/${MAX_ATTEMPTS} falhou:`,
          error
        );

        if (
          error instanceof Error &&
          error.message ===
            "A IA não retornou conteúdo."
        ) {
          throw error;
        }

        const transientCode =
          getTransientErrorCode(
            error
          );

        // Um timeout indica que o modelo está lento: repetir no mesmo modelo
        // só consome o tempo de espera, então segue direto para o alternativo.
        if (
          transientCode ===
          "TIMEOUT"
        ) {
          throw new TransientAIError(
            "TIMEOUT",
            this.getTransientErrorMessage("TIMEOUT"),
          );
        }

        if (
          !isRetryableError(error) ||
          attempt ===
            MAX_ATTEMPTS
        ) {
          if (transientCode) {
            throw new TransientAIError(
              transientCode,
              this.getTransientErrorMessage(transientCode),
            );
          }

          throw error;
        }

        const delay =
          INITIAL_RETRY_DELAY_MS *
          2 **
            (attempt - 1);

        const jitter =
          INITIAL_RETRY_DELAY_MS > 0
            ? Math.floor(
                Math.random() *
                  500
              )
            : 0;

        await sleep(
          delay +
            jitter
        );
      }
    }

    throw new Error(
      "Falha na comunicação com o serviço de IA."
    );
  }

  private toUserFacingError(error: unknown) {
    if (error instanceof TransientAIError) {
      return error;
    }

    if (error instanceof Error && error.message === "A IA não retornou conteúdo.") {
      return error;
    }

    const transientCode = getTransientErrorCode(error);
    if (transientCode) {
      return new TransientAIError(
        transientCode,
        this.getTransientErrorMessage(transientCode),
      );
    }

    return new Error("Falha na comunicação com o serviço de IA.");
  }

  private getTransientErrorMessage(code: NonNullable<ReturnType<typeof getTransientErrorCode>>) {
    if (code === "TIMEOUT") return "Timeout na comunicação com a IA.";
    if (code === "RATE_LIMIT") return "Limite temporário de requisições da IA atingido.";
    if (code === "UNAVAILABLE") {
      return "Serviço de IA temporariamente indisponível nos modelos principal e alternativo.";
    }
    return "Falha de conexão com o serviço de IA.";
  }
}
