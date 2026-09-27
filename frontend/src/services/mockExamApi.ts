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

const API_URL =
  process.env.EXPO_PUBLIC_API_URL;

export async function getDisciplines(): Promise<
  Discipline[]
> {
  const response =
    await fetch(
      `${API_URL}/disciplines`
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
      `${API_URL}/disciplines/${disciplineCode}/stages`
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
      `${API_URL}/disciplines/${disciplineCode}/stages/${stageCode}/descriptors`
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
      `${API_URL}/mock-exams/validate`,
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
    await fetch(
      `${API_URL}/mock-exams/generate`,
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