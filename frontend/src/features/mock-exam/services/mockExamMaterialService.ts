import type { MockExamGenerationStatus } from "@/src/services/mockExamApi";

type MaterialContext = {
  requestId: string;
  disciplineCode: string;
  stageCode: string;
  questionCount: number;
  createdAt: string;
};

export type StudentVersionMaterial = MaterialContext & {
  kind: "student";
  instructions: string;
  questions: Array<{
    position: number;
    statement: string;
    alternatives: Array<{ label: string; text: string }>;
    stimulusText: string | null;
    stimulusAssetPath: string | null;
    stimulusAltText: string | null;
  }>;
};

export type AnswerSheetMaterial = MaterialContext & {
  kind: "answer-sheet";
  questions: Array<{
    position: number;
    alternatives: string[];
  }>;
};

export type AnswerKeyMaterial = MaterialContext & {
  kind: "answer-key";
  questions: Array<{
    position: number;
    correctAnswer: string;
    descriptor: { code: string; description: string };
    difficulty: "easy" | "medium" | "hard" | null;
    origin: "Banco de questões" | "IA";
  }>;
  skills: Array<{
    code: string;
    description: string;
    questionCount: number;
    positions: number[];
  }>;
};

export type MockExamMaterial =
  | StudentVersionMaterial
  | AnswerSheetMaterial
  | AnswerKeyMaterial;

export type MockExamMaterials = {
  student: StudentVersionMaterial;
  "answer-sheet": AnswerSheetMaterial;
  "answer-key": AnswerKeyMaterial;
};

export function buildMockExamMaterials(
  generation: MockExamGenerationStatus,
): MockExamMaterials {
  if (generation.status !== "COMPLETED") {
    throw new Error("Os materiais só podem ser preparados após a conclusão do simulado.");
  }

  if (generation.questions.length !== generation.questionCount) {
    throw new Error("Não foi possível preparar materiais para um simulado incompleto.");
  }

  generation.questions.forEach((question, index) => {
    if (question.position !== index + 1) {
      throw new Error("A ordem das questões persistidas está incompleta ou inválida.");
    }
    if (!question.alternatives.some(({ label }) => label === question.correctAnswer)) {
      throw new Error(`A questão ${question.position} não possui uma alternativa correta válida.`);
    }
  });

  const context: MaterialContext = {
    requestId: generation.requestId,
    disciplineCode: generation.disciplineCode,
    stageCode: generation.stageCode,
    questionCount: generation.questionCount,
    createdAt: generation.createdAt,
  };

  const student: StudentVersionMaterial = {
    ...context,
    kind: "student",
    instructions: "Leia cada questão com atenção e marque apenas uma alternativa no cartão-resposta.",
    questions: generation.questions.map((question) => ({
      position: question.position,
      statement: question.statement,
      alternatives: question.alternatives.map(({ label, text }) => ({ label, text })),
      stimulusText: question.stimulusText,
      stimulusAssetPath: question.stimulusAssetPath,
      stimulusAltText: question.stimulusAltText,
    })),
  };

  const answerSheet: AnswerSheetMaterial = {
    ...context,
    kind: "answer-sheet",
    questions: generation.questions.map((question) => ({
      position: question.position,
      alternatives: question.alternatives.map(({ label }) => label),
    })),
  };

  const skills = new Map<string, AnswerKeyMaterial["skills"][number]>();
  const answerKey: AnswerKeyMaterial = {
    ...context,
    kind: "answer-key",
    questions: generation.questions.map((question) => {
      const descriptor = {
        code: question.descriptor.code,
        description: question.descriptor.description,
      };
      const skill = skills.get(descriptor.code) ?? {
        ...descriptor,
        questionCount: 0,
        positions: [],
      };
      skill.questionCount += 1;
      skill.positions.push(question.position);
      skills.set(descriptor.code, skill);

      return {
        position: question.position,
        correctAnswer: question.correctAnswer,
        descriptor,
        difficulty: question.difficulty,
        origin: question.sourceArchivedQuestionId ? "Banco de questões" : "IA",
      };
    }),
    skills: Array.from(skills.values()),
  };

  return { student, "answer-sheet": answerSheet, "answer-key": answerKey };
}
