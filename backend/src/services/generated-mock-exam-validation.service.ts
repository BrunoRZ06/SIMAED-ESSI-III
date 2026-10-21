import type {
  GeneratedMockExam,
} from "../ai/schemas/generated-question.schema.js";

import type {
  MockExamGenerationInput,
} from "../ai/types/ai-generation.js";

export function validateGeneratedMockExamStructure(
  exam: GeneratedMockExam
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

    if (
      uniqueAlternativeIds.size !==
      4
    ) {
      throw new Error(
        "A questão possui alternativas duplicadas."
      );
    }

    const expectedIds = [
      "A",
      "B",
      "C",
      "D",
    ];

    const hasAllAlternatives =
      expectedIds.every(
        (id) =>
          uniqueAlternativeIds.has(
            id as
              | "A"
              | "B"
              | "C"
              | "D"
          )
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
  exam: GeneratedMockExam,
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
  exam: GeneratedMockExam
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
  exam: GeneratedMockExam,
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
  exam: GeneratedMockExam,
  input: MockExamGenerationInput
) {
  for (
    const question
    of exam.questions
  ) {
    if (
      question.difficulty !==
      input.difficulty
    ) {
      throw new Error(
        "A dificuldade da questão não corresponde à dificuldade solicitada."
      );
    }
  }
}

export function validateGeneratedMockExam(
  exam: GeneratedMockExam,
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
}