import Constants from "expo-constants";
import { Platform } from "react-native";

export type Discipline = {
  id: string;
  code: string;
  name: string;
};

export type Stage = {
  id: string;
  code: string;
  name: string;
};

export type Descriptor = {
  id: string;
  code: string;
  description: string;
};

export type ValidationErrorCode =
  | "REQUIRED_FIELD"
  | "INVALID_FORMAT"
  | "INVALID_VALUE"
  | "NOT_FOUND"
  | "INACTIVE"
  | "INCOMPATIBLE";

export type ValidationError = {
  code: ValidationErrorCode;
  field: string;
  message: string;
};

export type MockExamValidationPayload = {
  disciplineCode: string;
  stageCode: string;
  descriptorIds: string[];
  questionCount: number;
  difficulty:
    | "easy"
    | "medium"
    | "hard";
  questionType:
    | "previous"
    | "new"
    | "combined";
};

export type MockExamValidationResponse = {
  valid: boolean;
  errors?: ValidationError[];
  data?: MockExamValidationPayload;
};

export type MockExamGenerationSuccess = {
  accepted: true;
  duplicate: boolean;
  requestId: string;
  status:
    | "PENDING"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED";
  message: string;
};

export type MockExamGenerationFailure = {
  accepted: false;
  message: string;
  code?: string;
  errors?: ValidationError[];
};

export type MockExamGenerationResult =
  | MockExamGenerationSuccess
  | MockExamGenerationFailure;

export type GeneratedQuestionResult = {
  id: string;
  position: number;
  statement: string;
  correctAnswer: "A" | "B" | "C" | "D" | "E";
  difficulty: "easy" | "medium" | "hard" | null;
  questionType: "previous" | "new" | "combined";
  sourceArchivedQuestionId: string | null;
  stimulusText: string | null;
  stimulusAssetPath: string | null;
  stimulusAltText: string | null;
  descriptor: {
    id: string;
    code: string;
    description: string;
  };
  alternatives: {
    id: string;
    label: "A" | "B" | "C" | "D" | "E";
    text: string;
  }[];
};

export type MockExamGenerationStatus = {
  requestId: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  disciplineCode: string;
  stageCode: string;
  descriptorIds: string[];
  questionCount: number;
  difficulty: "easy" | "medium" | "hard" | null;
  questionType: "previous" | "new" | "combined";
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  descriptors: {
    id: string;
    code: string;
    description: string;
  }[];
  questions: GeneratedQuestionResult[];
};

const CONFIGURED_API_URL =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, "");
const WEB_API_URL =
  process.env.EXPO_PUBLIC_API_URL_WEB?.replace(/\/+$/, "");
const NATIVE_API_URL =
  process.env.EXPO_PUBLIC_API_URL_NATIVE?.replace(/\/+$/, "");

function isLocalNetworkHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");

  if (
    host === "localhost" ||
    host === "::1" ||
    host.startsWith("127.")
  ) {
    return true;
  }

  const octets = host.split(".").map(Number);
  if (
    octets.length !== 4 ||
    octets.some(
      (octet) =>
        !Number.isInteger(octet) ||
        octet < 0 ||
        octet > 255,
    )
  ) {
    return false;
  }

  return (
    octets[0] === 10 ||
    (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
    (octets[0] === 192 && octets[1] === 168) ||
    (octets[0] === 169 && octets[1] === 254)
  );
}

function getExpoHost() {
  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) return null;

  try {
    const url = new URL(
      hostUri.includes("://") ? hostUri : `http://${hostUri}`,
    );
    return url.hostname;
  } catch {
    return null;
  }
}

function getApiUrl() {
  const platformApiUrl =
    Platform.OS === "web"
      ? WEB_API_URL
      : NATIVE_API_URL;
  const configuredUrl =
    platformApiUrl ?? CONFIGURED_API_URL;

  if (!configuredUrl) {
    throw new Error(
      "API não configurada. Defina EXPO_PUBLIC_API_URL ou a variável específica da plataforma no frontend.",
    );
  }

  let url: URL;
  try {
    url = new URL(configuredUrl);
  } catch {
    throw new Error(
      "A URL da API é inválida. Use um endereço absoluto, como http://localhost:3000.",
    );
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(
      "A URL da API deve usar o protocolo HTTP ou HTTPS.",
    );
  }

  if (platformApiUrl || !__DEV__) {
    return configuredUrl;
  }

  if (isLocalNetworkHost(url.hostname)) {
    const developmentHost =
      Platform.OS === "web"
        ? typeof window !== "undefined"
          ? window.location.hostname
          : null
        : getExpoHost();

    if (developmentHost) {
      url.hostname = developmentHost;
    }
  }

  return url.toString().replace(/\/$/, "");
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 10_000,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch {
    if (controller.signal.aborted) {
      throw new Error("A API não respondeu dentro do prazo. Confira a conexão e tente novamente.");
    }
    throw new Error("Não foi possível conectar à API. Confira o endereço e se o backend está em execução.");
  } finally {
    clearTimeout(timeout);
  }
}

export function getQuestionAssetUrl(path: string) {
  const encodedPath = path
    .split("/")
    .map(encodeURIComponent)
    .join("/");
  return `${getApiUrl()}/question-assets/${encodedPath}`;
}

export async function getDisciplines(): Promise<
  Discipline[]
> {
  const response =
    await fetch(
      `${getApiUrl()}/disciplines`
    );

  if (!response.ok) {
    throw new Error(
      "Erro ao buscar disciplinas"
    );
  }

  return response.json();
}

export async function getStages(
  disciplineCode: string
): Promise<Stage[]> {
  const response =
    await fetch(
      `${getApiUrl()}/disciplines/${disciplineCode}/stages`
    );

  if (!response.ok) {
    throw new Error(
      "Erro ao buscar séries"
    );
  }

  return response.json();
}

export async function getDescriptors(
  disciplineCode: string,
  stageCode: string
): Promise<Descriptor[]> {
  const response =
    await fetch(
      `${getApiUrl()}/disciplines/${disciplineCode}/stages/${stageCode}/descriptors`
    );

  if (!response.ok) {
    throw new Error(
      "Erro ao buscar descritores"
    );
  }

  return response.json();
}

export async function validateMockExam(
  config: MockExamValidationPayload
): Promise<MockExamValidationResponse> {
  const response =
    await fetch(
      `${getApiUrl()}/mock-exams/validate`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            config
          ),
      }
    );

  const data:
    MockExamValidationResponse =
    await response.json();

  if (
    response.status === 400
  ) {
    return data;
  }

  if (!response.ok) {
    throw new Error(
      "Não foi possível validar a configuração."
    );
  }

  return data;
}

export async function requestMockExamGeneration(
  config: MockExamValidationPayload
): Promise<MockExamGenerationResult> {
  const response =
    await fetchWithTimeout(
      `${getApiUrl()}/mock-exams/generate`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            config
          ),
      },
      30_000,
    );

  const data =
    await response.json();

  if (
    response.status === 400
  ) {
    return {
      accepted: false,
      message:
        "Configuração inválida.",
      errors:
        data.errors ?? [],
    };
  }

  if (!response.ok) {
    return {
      accepted: false,
      code:
        data.code ??
        "GENERATION_ERROR",

      message:
        data.message ??
        "Não foi possível iniciar a geração.",
    };
  }

  return data;
}

export async function waitForMockExamGeneration(
  requestId: string,
  timeoutMs = 300_000
): Promise<MockExamGenerationStatus> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const generation = await getMockExamGenerationStatus(requestId);

    if (generation.status === "FAILED") {
      throw new Error(
        generation.errorMessage ?? "A geração do simulado falhou."
      );
    }

    if (generation.status === "COMPLETED") {
      if (generation.questions.length !== generation.questionCount) {
        throw new Error(
          "A geração foi concluída com uma quantidade inesperada de questões."
        );
      }

      return generation;
    }

    await new Promise((resolve) => setTimeout(resolve, 1_200));
  }

  throw new Error(
    "A geração ainda está em andamento. Tente consultar novamente em instantes."
  );
}

export async function getMockExamGenerationStatus(
  requestId: string,
): Promise<MockExamGenerationStatus> {
  const response = await fetchWithTimeout(
    `${getApiUrl()}/mock-exams/generate/${encodeURIComponent(requestId)}`,
    {},
    10_000,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Não foi possível consultar este simulado.");
  }

  return data as MockExamGenerationStatus;
}
