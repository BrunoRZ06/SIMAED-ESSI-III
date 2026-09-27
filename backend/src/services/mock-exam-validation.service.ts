import { prisma } from "../lib/prisma.js";

import type { MockExamConfigInput } from "../schemas/mock-exam.schema.js";
import type { ValidationError } from "../types/validation-error.js";

export async function validateParameterAvailability(
  config: MockExamConfigInput
): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];

  const discipline = await prisma.discipline.findUnique({
    where: {
      code: config.disciplineCode,
    },
    select: {
      id: true,
      isActive: true,
    },
  });

  if (!discipline) {
    errors.push({
      code: "NOT_FOUND",
      field: "disciplineCode",
      message: "Disciplina não encontrada.",
    });
  } else if (!discipline.isActive) {
    errors.push({
      code: "INACTIVE",
      field: "disciplineCode",
      message: "Disciplina indisponível.",
    });
  }

  const stage = await prisma.stage.findUnique({
    where: {
      code: config.stageCode,
    },
    select: {
      id: true,
      isActive: true,
    },
  });

  if (!stage) {
    errors.push({
      code: "NOT_FOUND",
      field: "stageCode",
      message: "Série não encontrada.",
    });
  } else if (!stage.isActive) {
    errors.push({
      code: "INACTIVE",
      field: "stageCode",
      message: "Série indisponível.",
    });
  }

  const descriptors = await prisma.descriptor.findMany({
    where: {
      id: {
        in: config.descriptorIds,
      },
    },
    select: {
      id: true,
      isActive: true,
    },
  });

  const descriptorMap = new Map(
    descriptors.map((descriptor) => [
      descriptor.id,
      descriptor,
    ])
  );

  for (const descriptorId of config.descriptorIds) {
    const descriptor = descriptorMap.get(descriptorId);

    if (!descriptor) {
      errors.push({
        code: "NOT_FOUND",
        field: "descriptorIds",
        message: `Habilidade não encontrada: ${descriptorId}`,
      });

      continue;
    }

    if (!descriptor.isActive) {
      errors.push({
        code: "INACTIVE",
        field: "descriptorIds",
        message: `Habilidade indisponível: ${descriptorId}`,
      });
    }
  }

  return errors;
}

export async function validateDisciplineStageCompatibility(
  config: MockExamConfigInput
): Promise<ValidationError[]> {
  const compatibleDescriptor =
    await prisma.descriptor.findFirst({
      where: {
        isActive: true,

        discipline: {
          code: config.disciplineCode,
          isActive: true,
        },

        stage: {
          code: config.stageCode,
          isActive: true,
        },

        matrix: {
          isActive: true,
        },
      },

      select: {
        id: true,
      },
    });

  if (!compatibleDescriptor) {
    return [
      {
        code: "INCOMPATIBLE",
        field: "stageCode",
        message:
          "A série informada não é compatível com a disciplina selecionada.",
      },
    ];
  }

  return [];
}

export async function validateDescriptorCompatibility(
  config: MockExamConfigInput
): Promise<ValidationError[]> {
  const compatibleDescriptors =
    await prisma.descriptor.findMany({
      where: {
        id: {
          in: config.descriptorIds,
        },

        isActive: true,

        discipline: {
          code: config.disciplineCode,
          isActive: true,
        },

        stage: {
          code: config.stageCode,
          isActive: true,
        },

        matrix: {
          isActive: true,
        },
      },

      select: {
        id: true,
      },
    });

  const compatibleIds = new Set(
    compatibleDescriptors.map(
      (descriptor) => descriptor.id
    )
  );

  const errors: ValidationError[] = [];

  for (const descriptorId of config.descriptorIds) {
    if (!compatibleIds.has(descriptorId)) {
      errors.push({
        code: "INCOMPATIBLE",
        field: "descriptorIds",
        message: `Habilidade incompatível com a disciplina e série informadas: ${descriptorId}`,
      });
    }
  }

  return errors;
}

export async function validateMockExamConfiguration(
  config: MockExamConfigInput
): Promise<ValidationError[]> {
  const availabilityErrors =
    await validateParameterAvailability(config);

  if (availabilityErrors.length > 0) {
    return availabilityErrors;
  }

  const disciplineStageErrors =
    await validateDisciplineStageCompatibility(config);

  if (disciplineStageErrors.length > 0) {
    return disciplineStageErrors;
  }

  const descriptorErrors =
    await validateDescriptorCompatibility(config);

  if (descriptorErrors.length > 0) {
    return descriptorErrors;
  }

  return [];
}