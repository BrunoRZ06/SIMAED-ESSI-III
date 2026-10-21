import {
  GoogleGenAI,
} from "@google/genai";

import {
  generatedMockExamJsonSchema,
} from "../schemas/generated-question.schema.js";

import type {
  AIClient,
} from "./ai-client.js";

const AI_TIMEOUT_MS =
  30_000;

const MAX_ATTEMPTS =
  4;

const INITIAL_RETRY_DELAY_MS =
  1_000;

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

function isRetryableError(
  error: unknown
) {
  const status =
    getStatusCode(error);

  if (
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  ) {
    return true;
  }

  if (
    error instanceof Error &&
    (
      error.name ===
        "TimeoutError" ||
      error.name ===
        "AbortError"
    )
  ) {
    return true;
  }

  return false;
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
    for (
      let attempt = 1;
      attempt <= MAX_ATTEMPTS;
      attempt++
    ) {
      try {
        const response =
          await this.client.models.generateContent({
            model:
              this.model,

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

        const retryable =
          isRetryableError(
            error
          );

        if (
          !retryable ||
          attempt ===
            MAX_ATTEMPTS
        ) {
          if (
            error instanceof Error &&
            (
              error.name ===
                "TimeoutError" ||
              error.name ===
                "AbortError"
            )
          ) {
            throw new Error(
              "Timeout na comunicação com a IA."
            );
          }

          const status =
            getStatusCode(
              error
            );

          if (
            status === 503
          ) {
            throw new Error(
              "Serviço de IA temporariamente indisponível."
            );
          }

          if (
            status === 429
          ) {
            throw new Error(
              "Limite temporário de requisições da IA atingido."
            );
          }

          throw new Error(
            "Falha na comunicação com o serviço de IA."
          );
        }

        const delay =
          INITIAL_RETRY_DELAY_MS *
          2 **
            (attempt - 1);

        const jitter =
          Math.floor(
            Math.random() *
              500
          );

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
}