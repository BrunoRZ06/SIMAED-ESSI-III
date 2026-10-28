import { prisma } from "../lib/prisma.js";

import type {
  PersistableMockExam,
} from "./archived-question-generation.service.js";

import {
  GenerationStatus,
} from "../../generated/prisma/client.js";

import type { MockExamConfigInput } from "../schemas/mock-exam.schema.js";

export async function createMockExamGenerationRequest(
  config: MockExamConfigInput,
  configHash: string,
  simulateFailure = false
) {
  if (simulateFailure) {
    throw new Error(
      "Falha simulada na criação da solicitação"
    );
  }

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
        config.questionType === "previous"
          ? null
          : config.difficulty,

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

export async function completeMockExamGeneration(
  requestId: string,
  questionType: MockExamConfigInput["questionType"],
  exam: PersistableMockExam
) {
  return prisma.$transaction(async (transaction) => {
    await transaction.generatedQuestion.deleteMany({
      where: {
        generationRequestId: requestId,
      },
    });

    return transaction.mockExamGenerationRequest.update({
      where: {
        requestId,
      },
      data: {
        status: GenerationStatus.COMPLETED,
        errorMessage: null,
        questions: {
          create: exam.questions.map((question, index) => ({
            position: index + 1,
            statement: question.statement,
            correctAnswer: question.correctAnswer,
            difficulty: question.difficulty,
            questionType: question.questionType ?? questionType,
            stimulusText: question.stimulusText ?? null,
            stimulusAssetPath: question.stimulusAssetPath ?? null,
            stimulusAltText: question.stimulusAltText ?? null,
            ...(question.sourceArchivedQuestionId
              ? {
                  sourceArchivedQuestion: {
                    connect: { id: question.sourceArchivedQuestionId },
                  },
                }
              : {}),
            descriptor: {
              connect: {
                id: question.descriptorId,
              },
            },
            alternatives: {
              create: question.alternatives.map((alternative) => ({
                label: alternative.id,
                text: alternative.text,
              })),
            },
          })),
        },
      },
      select: {
        requestId: true,
        status: true,
        updatedAt: true,
      },
    });
  });
}

export async function findMockExamGenerationResult(
  requestId: string
) {
  const result = await prisma.mockExamGenerationRequest.findUnique({
    where: {
      requestId,
    },
    select: {
      requestId: true,
      status: true,
      disciplineCode: true,
      stageCode: true,
      descriptorIds: true,
      questionCount: true,
      difficulty: true,
      questionType: true,
      errorMessage: true,
      createdAt: true,
      updatedAt: true,
      questions: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          position: true,
          statement: true,
          correctAnswer: true,
          difficulty: true,
          questionType: true,
          sourceArchivedQuestionId: true,
          stimulusText: true,
          stimulusAssetPath: true,
          stimulusAltText: true,
          descriptor: {
            select: {
              id: true,
              code: true,
              description: true,
            },
          },
          alternatives: {
            orderBy: {
              label: "asc",
            },
            select: {
              id: true,
              label: true,
              text: true,
            },
          },
        },
      },
    },
  });

  if (!result) return null;

  const descriptors = result.descriptorIds.length > 0
    ? await prisma.descriptor.findMany({
        where: { id: { in: result.descriptorIds } },
        select: { id: true, code: true, description: true },
      })
    : [];

  return { ...result, descriptors };
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
