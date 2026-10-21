import {
  createHash,
} from "node:crypto";

import type {
  MockExamConfigInput,
} from "../schemas/mock-exam.schema.js";

import {
  createMockExamGenerationRequest,
  findRecentGenerationRequest,
} from "./mock-exam-generation.service.js";

import {
  processMockExamGeneration,
} from "./mock-exam-generation-processor.service.js";

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
  config: MockExamConfigInput,
  simulateCreationFailure = false
) {
  const configHash =
    createConfigHash(
      config
    );

  const since =
    new Date(
      Date.now() -
        DUPLICATE_WINDOW_MS
    );

  const existingRequest =
    await findRecentGenerationRequest(
      configHash,
      since
    );

  if (
    existingRequest
  ) {
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
      configHash,
      simulateCreationFailure
    );

  void processMockExamGeneration(
    request.requestId,
    config
  );

  return {
    requestId:
      request.requestId,

    status:
      request.status,

    duplicate: false,
  };
}