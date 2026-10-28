import { GenerationStatus } from "../../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import type { MockExamConfigInput } from "../schemas/mock-exam.schema.js";
import type { PersistableQuestion } from "./archived-question-generation.service.js";

const ALTERNATIVE_LABELS = ["A", "B", "C", "D", "E"] as const;
type AlternativeLabel = (typeof ALTERNATIVE_LABELS)[number];

function isAlternativeLabel(value: string): value is AlternativeLabel {
  return ALTERNATIVE_LABELS.includes(value as AlternativeLabel);
}

function toReusableQuestion(
  question: {
    statement: string;
    correctAnswer: string;
    descriptorId: string;
    difficulty: string | null;
    alternatives: Array<{ label: string; text: string }>;
  },
  config: MockExamConfigInput,
): PersistableQuestion | null {
  const alternatives = question.alternatives;
  const labels = alternatives.map(({ label }) => label);

  if (
    !question.statement.trim() ||
    !["easy", "medium", "hard"].includes(question.difficulty ?? "") ||
    question.difficulty !== config.difficulty ||
    !config.descriptorIds.includes(question.descriptorId) ||
    !isAlternativeLabel(question.correctAnswer) ||
    ![4, 5].includes(labels.length) ||
    labels.some((label) => !isAlternativeLabel(label)) ||
    new Set(labels).size !== labels.length ||
    !labels.includes(question.correctAnswer) ||
    alternatives.some(({ text }) => !text.trim())
  ) {
    return null;
  }

  return {
    statement: question.statement,
    alternatives: alternatives.map(({ label, text }) => ({
      id: label as AlternativeLabel,
      text,
    })),
    correctAnswer: question.correctAnswer,
    descriptorId: question.descriptorId,
    difficulty: question.difficulty as PersistableQuestion["difficulty"],
    questionType: "new",
  };
}

export async function findReusableAIGeneratedQuestions(
  config: MockExamConfigInput,
  currentRequestId: string,
  requiredCount: number,
): Promise<PersistableQuestion[]> {
  const descriptorIds = [...config.descriptorIds].sort();
  const previousRequests = await prisma.mockExamGenerationRequest.findMany({
    where: {
      requestId: { not: currentRequestId },
      status: GenerationStatus.COMPLETED,
      disciplineCode: config.disciplineCode,
      stageCode: config.stageCode,
      descriptorIds: { hasEvery: descriptorIds },
      questionCount: config.questionCount,
      difficulty: config.difficulty,
      questionType: config.questionType,
    },
    orderBy: { createdAt: "desc" },
    select: {
      descriptorIds: true,
      questions: {
        where: {
          descriptorId: { in: descriptorIds },
          sourceArchivedQuestionId: null,
          questionType: "new",
          difficulty: config.difficulty,
        },
        orderBy: { position: "asc" },
        select: {
          statement: true,
          correctAnswer: true,
          descriptorId: true,
          difficulty: true,
          alternatives: {
            orderBy: { label: "asc" },
            select: { label: true, text: true },
          },
        },
      },
    },
  });

  let bestReusableQuestions: PersistableQuestion[] = [];

  for (const previousRequest of previousRequests) {
    const previousDescriptorIds = [...previousRequest.descriptorIds].sort();
    if (
      previousDescriptorIds.length !== descriptorIds.length ||
      previousDescriptorIds.some((id, index) => id !== descriptorIds[index])
    ) {
      continue;
    }

    const reusableQuestions = previousRequest.questions
      .map((question) => toReusableQuestion(question, config))
      .filter((question): question is PersistableQuestion => question !== null);

    if (reusableQuestions.length >= requiredCount) {
      return reusableQuestions.slice(0, requiredCount);
    }

    if (reusableQuestions.length > bestReusableQuestions.length) {
      bestReusableQuestions = reusableQuestions;
    }
  }

  return bestReusableQuestions;
}
