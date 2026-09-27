import { prisma } from "../lib/prisma.js";

import {
  GenerationStatus,
} from "../../generated/prisma/client.js";

import type { MockExamConfigInput } from "../schemas/mock-exam.schema.js";

export async function createMockExamGenerationRequest(
  config: MockExamConfigInput,
  configHash: string
) {
  return prisma.mockExamGenerationRequest.create({
    data: {
      disciplineCode:
        config.disciplineCode,

      stageCode:
        config.stageCode,

      descriptorIds:
        config.descriptorIds,

      questionCount:
        config.questionCount,

      difficulty:
        config.difficulty,

      questionType:
        config.questionType,

      configHash,
    },

    select: {
      requestId: true,
      status: true,
      createdAt: true,
    },
  });
}

export async function updateMockExamGenerationStatus(
  requestId: string,
  status: GenerationStatus
) {
  return prisma.mockExamGenerationRequest.update({
    where: {
      requestId,
    },

    data: {
      status,
    },

    select: {
      requestId: true,
      status: true,
      updatedAt: true,
    },
  });
}

export async function markMockExamGenerationAsFailed(
  requestId: string,
  errorMessage: string
) {
  return prisma.mockExamGenerationRequest.update({
    where: {
      requestId,
    },

    data: {
      status:
        GenerationStatus.FAILED,

      errorMessage,
    },

    select: {
      requestId: true,
      status: true,
    },
  });
}

export async function findRecentGenerationRequest(
  configHash: string,
  since: Date
) {
  return prisma.mockExamGenerationRequest.findFirst({
    where: {
      configHash,

      createdAt: {
        gte: since,
      },

      status: {
        in: [
          GenerationStatus.PENDING,
          GenerationStatus.PROCESSING,
        ],
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      requestId: true,
      status: true,
    },
  });
}