import {
  createHash,
} from "node:crypto";

import {
  GenerationStatus,
} from "../../generated/prisma/client.js";

import type { MockExamConfigInput } from "../schemas/mock-exam.schema.js";

import {
  createMockExamGenerationRequest,
  findRecentGenerationRequest,
  markMockExamGenerationAsFailed,
  updateMockExamGenerationStatus,
} from "./mock-exam-generation.service.js";

import {
  dispatchMockExamGeneration,
} from "./mock-exam-generator.service.js";

import {
  MockExamGenerationStartError,
} from "../errors/mock-exam-generation-start.error.js";

const DUPLICATE_WINDOW_MS =
  30_000;

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

export async function orchestrateMockExamGeneration(
  config: MockExamConfigInput
) {
  const configHash =
    createConfigHash(config);

  const duplicateSince =
    new Date(
      Date.now() -
        DUPLICATE_WINDOW_MS
    );

  const existingRequest =
    await findRecentGenerationRequest(
      configHash,
      duplicateSince
    );

  if (existingRequest) {
    return {
      requestId:
        existingRequest.requestId,

      status:
        existingRequest.status,

      duplicate: true,
    };
  }

  const request =
    await createMockExamGenerationRequest(
      config,
      configHash
    );

  try {
    await dispatchMockExamGeneration({
      requestId:
        request.requestId,

      config,
    });

    const processingRequest =
      await updateMockExamGenerationStatus(
        request.requestId,
        GenerationStatus.PROCESSING
      );

    return {
      requestId:
        processingRequest.requestId,

      status:
        processingRequest.status,

      duplicate: false,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro desconhecido";

    await markMockExamGenerationAsFailed(
      request.requestId,
      errorMessage
    ).catch(() => undefined);

    throw new MockExamGenerationStartError(
      request.requestId
    );
  }
}