import { prisma } from "../lib/prisma.js";
import type { MockExamConfigInput } from "../schemas/mock-exam.schema.js";
import type { MockExamGenerationInput } from "../ai/types/ai-generation.js";
type AlternativeLabel = "A" | "B" | "C" | "D" | "E";

export type PersistableQuestion = {
  statement: string;
  alternatives: Array<{ id: AlternativeLabel; text: string }>;
  correctAnswer: AlternativeLabel;
  descriptorId: string;
  difficulty: "easy" | "medium" | "hard" | null;
  sourceArchivedQuestionId?: string | null;
  questionType?: "previous" | "new" | "combined";
  stimulusText?: string | null;
  stimulusAssetPath?: string | null;
  stimulusAltText?: string | null;
};

export type PersistableMockExam = { questions: PersistableQuestion[] };

async function findAvailableArchivedQuestions(input: {
  disciplineCode: string;
  stageCode: string;
  descriptorIds: string[];
}) {
  const descriptors = await prisma.descriptor.findMany({
    where: {
      id: { in: input.descriptorIds },
      discipline: { code: input.disciplineCode },
      stage: { code: input.stageCode },
    },
    select: { code: true },
  });
  const descriptorCodes = [...new Set(descriptors.map(({ code }) => code))];

  if (descriptorCodes.length === 0) return [];

  const questions = await prisma.archivedQuestion.findMany({
    where: {
      disciplineCode: input.disciplineCode,
      descriptorCode: { in: descriptorCodes },
      reviewStatus: "REVIEWED",
      source: { is: { stageCode: input.stageCode } },
    },
    include: {
      alternatives: { orderBy: { label: "asc" } },
    },
  });

  return questions.filter((question) => {
    const labels = question.alternatives.map(({ label }) => label);
    const expectedLabels = labels.length === 5
      ? ["A", "B", "C", "D", "E"]
      : ["A", "B", "C", "D"];
    return Boolean(
      question.statement.trim() &&
      [4, 5].includes(labels.length) &&
      expectedLabels.every((label) => labels.includes(label)) &&
      new Set(labels).size === labels.length &&
      question.correctAlternative &&
      labels.includes(question.correctAlternative),
    );
  });
}

export async function countAvailableArchivedQuestions(
  config: MockExamConfigInput,
) {
  return (await findAvailableArchivedQuestions(config)).length;
}

export async function generateMockExamFromArchive(
  input: MockExamGenerationInput,
  questionCount: number,
): Promise<PersistableMockExam> {
  const available = await findAvailableArchivedQuestions({
    disciplineCode: input.discipline.code,
    stageCode: input.stage.code,
    descriptorIds: input.descriptors.map(({ id }) => id),
  });

  if (available.length < questionCount) {
    throw new Error(
      `O acervo tem somente ${available.length} questões compatíveis; são necessárias ${questionCount}.`,
    );
  }

  // Shuffle candidates so repeated requests do not always return the same items.
  for (let index = available.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [available[index], available[swapIndex]] = [available[swapIndex]!, available[index]!];
  }

  const descriptorIdsByCode = new Map(
    input.descriptors.map(({ id, code }) => [code, id]),
  );

  return {
    questions: available.slice(0, questionCount).map((question) => ({
      statement: question.statement,
      alternatives: question.alternatives.map(({ label, text }) => ({
        id: label as AlternativeLabel,
        text,
      })),
      correctAnswer: question.correctAlternative as AlternativeLabel,
      descriptorId: descriptorIdsByCode.get(question.descriptorCode!)!,
      // The archive does not classify item difficulty. Keep it unknown instead
      // of copying the requested difficulty onto a source question.
      difficulty: null,
      sourceArchivedQuestionId: question.id,
      questionType: "previous" as const,
      stimulusText: question.stimulusText,
      stimulusAssetPath: question.stimulusAssetPath,
      stimulusAltText: question.stimulusAltText,
    })),
  };
}
