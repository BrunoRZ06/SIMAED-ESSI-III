import { prisma } from "../lib/prisma.js";

const questions = await prisma.archivedQuestion.findMany({
  select: {
    disciplineCode: true,
    descriptorCode: true,
    correctAlternative: true,
    reviewStatus: true,
    source: { select: { stageCode: true } },
    alternatives: { select: { label: true } },
  },
});

const byStage: Record<string, number> = {};
const usableByStage: Record<string, number> = {};
for (const question of questions) {
  const key = `${question.source.stageCode}:${question.disciplineCode}`;
  byStage[key] = (byStage[key] ?? 0) + 1;
  const labels = question.alternatives.map(({ label }) => label);
  const expected = labels.length === 5 ? ["A", "B", "C", "D", "E"] : ["A", "B", "C", "D"];
  const usable =
    Boolean(question.correctAlternative) &&
    [4, 5].includes(labels.length) &&
    expected.every((label) => labels.includes(label)) &&
    labels.includes(question.correctAlternative!);
  if (usable) usableByStage[key] = (usableByStage[key] ?? 0) + 1;
}

console.log(JSON.stringify({ byStage, usableByStage }, null, 2));
await prisma.$disconnect();
