import type {
  AIClient,
} from "../ai/clients/ai-client.js";

import type {
  MockExamGenerationInput,
} from "../ai/types/ai-generation.js";

import {
  buildMockExamPrompt,
} from "../ai/prompts/mock-exam.prompt.js";

import {
  parseGeneratedMockExam,
} from "../ai/parsers/generated-question.parser.js";

import {
  validateGeneratedMockExam,
} from "./generated-mock-exam-validation.service.js";

const MAX_STRUCTURED_RESPONSE_ATTEMPTS = 2;

export async function generateMockExamWithAI(
  input: MockExamGenerationInput,
  aiClient: AIClient
) {
  const basePrompt =
    buildMockExamPrompt(
      input
    );

  let prompt = basePrompt;

  for (
    let attempt = 1;
    attempt <= MAX_STRUCTURED_RESPONSE_ATTEMPTS;
    attempt += 1
  ) {
    const rawResponse = await aiClient.generate(prompt);

    try {
      const exam = parseGeneratedMockExam(rawResponse);

      validateGeneratedMockExam(exam, input);

      return exam;
    } catch (error) {
      if (attempt === MAX_STRUCTURED_RESPONSE_ATTEMPTS) {
        throw error;
      }

      const reason = error instanceof Error
        ? error.message
        : "A resposta não correspondeu ao formato solicitado.";

      console.warn(
        `Resposta estruturada da IA inválida; solicitando nova tentativa (${attempt + 1}/${MAX_STRUCTURED_RESPONSE_ATTEMPTS}).`,
        reason,
      );

      prompt = `${basePrompt}\n\nA resposta anterior não foi aceita: ${reason}\nGere novamente todas as questões corrigindo esse problema. Retorne somente um objeto JSON válido no formato {"questions":[{"statement":"...","alternatives":[{"id":"A","text":"..."},{"id":"B","text":"..."},{"id":"C","text":"..."},{"id":"D","text":"..."}],"correctAnswer":"A","descriptorId":"UUID de um descritor fornecido","difficulty":"${input.difficulty}"}]}.`;
    }
  }

  throw new Error("A IA não conseguiu gerar questões em um formato válido.");
}
