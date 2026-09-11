import { prisma } from "../lib/prisma.js";

export async function getAllActiveDisciplines() {
  return prisma.discipline.findMany({
    where: {
      isActive: true,
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