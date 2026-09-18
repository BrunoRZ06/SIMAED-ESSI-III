import { prisma } from "../lib/prisma.js";

export async function getDescriptorsByConfiguration(
  disciplineCode: string,
  stageCode: string
) {
  return prisma.descriptor.findMany({
    where: {
      isActive: true,

      discipline: {
        code: disciplineCode,
        isActive: true,
      },

      stage: {
        code: stageCode,
        isActive: true,
      },

      matrix: {
        isActive: true,
      },
    },

    select: {
      id: true,
      code: true,
      description: true,
    },

    orderBy: {
      code: "asc",
    },
  });
}