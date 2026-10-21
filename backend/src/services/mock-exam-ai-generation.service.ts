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

export async function generateMockExamWithAI(
  input: MockExamGenerationInput,
  aiClient: AIClient
) {
  const prompt =
    buildMockExamPrompt(
      input
    );

  const rawResponse =
    await aiClient.generate(
      prompt
    );

  const exam =
    parseGeneratedMockExam(
      rawResponse
    );

  validateGeneratedMockExam(
    exam,
    input
  );

  return exam;
}