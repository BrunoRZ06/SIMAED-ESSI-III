import {
  createHash,
} from "node:crypto";

import type {
  Request,
  Response,
} from "express";

import {
  mockExamConfigSchema,
} from "../schemas/mock-exam.schema.js";

import type {
  MockExamConfigInput,
} from "../schemas/mock-exam.schema.js";

import {
  createMockExamGenerationRequest,
} from "../services/mock-exam-generation.service.js";

import {
  validateMockExamConfiguration,
} from "../services/mock-exam-validation.service.js";

import {
  mapZodErrors,
} from "../utils/zod-validation-error.js";

import {
  sendValidationErrors,
} from "../utils/validation-response.js";

function createConfigHash(
  config: MockExamConfigInput
) {
  const normalizedConfig = {
    disciplineCode:
      config.disciplineCode,

    stageCode:
      config.stageCode,

    descriptorIds: [
      ...config.descriptorIds,
    ].sort(),

    questionCount:
      config.questionCount,

    difficulty:
      config.difficulty,

    questionType:
      config.questionType,
  };

  return createHash("sha256")
    .update(
      JSON.stringify(
        normalizedConfig
      )
    )
    .digest("hex");
}

export async function validateMockExamConfig(
  req: Request,
  res: Response
) {
  const result =
    mockExamConfigSchema.safeParse(
      req.body
    );

  if (!result.success) {
    return sendValidationErrors(
      res,
      mapZodErrors(result.error)
    );
  }

  const errors =
    await validateMockExamConfiguration(
      result.data
    );

  if (errors.length > 0) {
    return sendValidationErrors(
      res,
      errors
    );
  }

  return res.status(200).json({
    valid: true,
    data: result.data,
  });
}

export async function requestMockExamGeneration(
  req: Request,
  res: Response
) {
  const config =
    res.locals
      .mockExamConfig as MockExamConfigInput;

  const configHash =
    createConfigHash(config);

  const simulateFailure =
    process.env.NODE_ENV !==
      "production" &&
    req.headers[
      "x-simulate-generation-failure"
    ] === "true";

  try {
    const request =
      await createMockExamGenerationRequest(
        config,
        configHash,
        simulateFailure
      );

    return res.status(202).json({
      accepted: true,
      message:
        "Solicitação de geração criada.",
      requestId:
        request.requestId,
      status:
        request.status,
    });
  } catch (error) {
    console.error(
      "Erro ao criar solicitação de geração:",
      error
    );

    return res.status(500).json({
      accepted: false,
      code:
        "GENERATION_REQUEST_CREATION_FAILED",
      message:
        "Não foi possível criar a solicitação de geração.",
    });
  }
}