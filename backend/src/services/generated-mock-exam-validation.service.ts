import type {
  MockExamGenerationInput,
} from "../ai/types/ai-generation.js";

type ValidationMockExam = {
  questions: Array<{
    alternatives: Array<{ id: "A" | "B" | "C" | "D" | "E"; text: string }>;
    correctAnswer: "A" | "B" | "C" | "D" | "E";
    descriptorId: string;
    difficulty: "easy" | "medium" | "hard" | null;
    statement: string;
    sourceArchivedQuestionId?: string | null;
  }>;
};

export function validateGeneratedMockExamStructure(
  exam: ValidationMockExam
) {
  for (
    const question
    of exam.questions
  ) {
    const alternativeIds =
      question.alternatives.map(
        (alternative) =>
          alternative.id
      );

    const uniqueAlternativeIds =
      new Set(
        alternativeIds
      );

    const expectedIds = question.sourceArchivedQuestionId && alternativeIds.length === 5
      ? ["A", "B", "C", "D", "E"]
      : ["A", "B", "C", "D"];

    if (uniqueAlternativeIds.size !== expectedIds.length) {
      throw new Error(
        "A questão possui alternativas duplicadas."
      );
    }

    const hasAllAlternatives =
      expectedIds.every(
        (id) => uniqueAlternativeIds.has(id as "A" | "B" | "C" | "D" | "E")
      );

    if (
      !hasAllAlternatives
    ) {
      throw new Error(
        "A questão deve possuir as alternativas A, B, C e D."
      );
    }

    const alternativeTexts =
      question.alternatives.map(
        (alternative) =>
          alternative.text
            .trim()
            .toLowerCase()
      );

    if (
      new Set(
        alternativeTexts
      ).size !==
      alternativeTexts.length
    ) {
      throw new Error(
        "A questão possui alternativas com textos duplicados."
      );
    }
  }
}

export function validateGeneratedQuestionCount(
  exam: ValidationMockExam,
  input: MockExamGenerationInput
) {
  if (
    exam.questions.length !==
    input.questionCount
  ) {
    throw new Error(
      `Quantidade de questões inválida. Esperado: ${input.questionCount}. Recebido: ${exam.questions.length}.`
    );
  }
}

export function validateGeneratedCorrectAnswers(
  exam: ValidationMockExam
) {
  for (
    const question
    of exam.questions
  ) {
    const correctAlternative =
      question.alternatives.find(
        (alternative) =>
          alternative.id ===
          question.correctAnswer
      );

    if (
      !correctAlternative
    ) {
      throw new Error(
        "O gabarito indicado não corresponde a nenhuma alternativa da questão."
      );
    }
  }
}

export function validateGeneratedDescriptors(
  exam: ValidationMockExam,
  input: MockExamGenerationInput
) {
  const validDescriptorIds =
    new Set(
      input.descriptors.map(
        (descriptor) =>
          descriptor.id
      )
    );

  for (
    const question
    of exam.questions
  ) {
    if (
      !validDescriptorIds.has(
        question.descriptorId
      )
    ) {
      throw new Error(
        "A IA retornou um descritor que não pertence à configuração do simulado."
      );
    }
  }
}

export function validateGeneratedDifficulty(
  exam: ValidationMockExam,
  input: MockExamGenerationInput
) {
  for (
    const question
    of exam.questions
  ) {
    if (
      !question.sourceArchivedQuestionId &&
      question.difficulty !==
      input.difficulty
    ) {
      throw new Error(
        "A dificuldade da questão não corresponde à dificuldade solicitada."
      );
    }
  }
}

function normalizeQuestionStatement(statement: string) {
  return statement
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function validateUniqueQuestions(exam: ValidationMockExam) {
  const sourceIds = new Set<string>();
  const normalizedStatements = new Set<string>();

  for (const question of exam.questions) {
    if (question.sourceArchivedQuestionId) {
      if (sourceIds.has(question.sourceArchivedQuestionId)) {
        throw new Error("Uma questão existente foi incluída mais de uma vez.");
      }
      sourceIds.add(question.sourceArchivedQuestionId);
    }

    const normalizedStatement = normalizeQuestionStatement(question.statement);
    if (normalizedStatements.has(normalizedStatement)) {
      throw new Error("O simulado contém questões com enunciados duplicados.");
    }
    normalizedStatements.add(normalizedStatement);
  }
}

export function validateGeneratedMockExam(
  exam: ValidationMockExam,
  input: MockExamGenerationInput
) {
  validateGeneratedMockExamStructure(
    exam
  );

  validateGeneratedQuestionCount(
    exam,
    input
  );

  validateGeneratedCorrectAnswers(
    exam
  );

  validateGeneratedDescriptors(
    exam,
    input
  );

  validateGeneratedDifficulty(
    exam,
    input
  );

  validateUniqueQuestions(exam);
}
