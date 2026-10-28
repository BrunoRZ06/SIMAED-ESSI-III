
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
  orchestrateMockExamGeneration,
} from "../services/mock-exam-generation-orchestrator.service.js";

import {
  findMockExamGenerationResult,
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

  if (
    errors.length > 0
  ) {
    return sendValidationErrors(
      res,
      errors
    );
  }

  return res.status(200).json({
    valid: true,
    data:
      result.data,
  });
}

export async function requestMockExamGeneration(
  req: Request,
  res: Response
) {
  const config =
    res.locals
      .mockExamConfig as MockExamConfigInput;

  const simulateFailure =
    process.env.NODE_ENV !==
      "production" &&
    req.headers[
      "x-simulate-generation-failure"
    ] === "true";

  try {
    const result =
      await orchestrateMockExamGeneration(
        config,
        simulateFailure
      );

    return res.status(202).json({
      accepted: true,

      duplicate:
        result.duplicate,

      message:
        result.duplicate
          ? "Esta solicitação já foi recebida."
          : "Solicitação de geração criada.",

      requestId:
        result.requestId,

      status:
        result.status,
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

export async function getMockExamGenerationResult(
  req: Request,
  res: Response
) {
  const requestId = req.params.requestId;

  if (typeof requestId !== "string") {
    return res.status(400).json({
      message: "Identificador da solicitação inválido.",
    });
  }

  try {
    const result =
      await findMockExamGenerationResult(
        requestId
      );

    if (!result) {
      return res.status(404).json({
        message: "Solicitação de geração não encontrada.",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(
      "Erro ao consultar resultado da geração:",
      error
    );

    return res.status(500).json({
      message: "Não foi possível consultar o resultado da geração.",
    });
  }
}
