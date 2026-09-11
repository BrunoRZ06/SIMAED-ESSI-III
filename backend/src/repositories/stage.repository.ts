import { prisma } from "../lib/prisma.js";

export async function getStagesByDiscipline(
  disciplineCode: string
) {
  return prisma.stage.findMany({
    where: {
      isActive: true,

      descriptors: {
        some: {
          isActive: true,

          discipline: {
            code: disciplineCode,
            isActive: true,
          },

          matrix: {
            code: "SAEPE_2025_SOMATIVA",
            isActive: true,
          },
        },
      },
    },

    select: {
      id: true,
      code: true,
      name: true,
    },

    orderBy: {
      name: "asc",
    },
  });
}