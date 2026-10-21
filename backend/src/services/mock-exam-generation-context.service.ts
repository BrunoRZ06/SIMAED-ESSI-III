import {
  prisma,
} from "../lib/prisma.js";

import type {
  MockExamConfigInput,
} from "../schemas/mock-exam.schema.js";

import type {
  MockExamGenerationInput,
} from "../ai/types/ai-generation.js";

export async function buildMockExamGenerationInput(
  requestId: string,
  config: MockExamConfigInput
): Promise<MockExamGenerationInput> {
  const discipline =
    await prisma.discipline.findUnique({
      where: {
        code:
          config.disciplineCode,
      },

      select: {
        code: true,
        name: true,
      },
    });

  const stage =
    await prisma.stage.findUnique({
      where: {
        code:
          config.stageCode,
      },

      select: {
        code: true,
        name: true,
      },
    });

  const descriptors =
    await prisma.descriptor.findMany({
      where: {
        id: {
          in:
            config.descriptorIds,
        },
      },

      select: {
        id: true,
        code: true,
        description: true,
      },
    });

  if (
    !discipline ||
    !stage
  ) {
    throw new Error(
      "Não foi possível montar o contexto da geração."
    );
  }

  const expectedDescriptorIds =
    new Set(
      config.descriptorIds
    );

  if (
    descriptors.length !==
    expectedDescriptorIds.size
  ) {
    throw new Error(
      "Não foi possível carregar todos os descritores da geração."
    );
  }

  return {
    requestId,

    discipline,

    stage,

    questionCount:
      config.questionCount,

    difficulty:
      config.difficulty,

    descriptors,
  };
}