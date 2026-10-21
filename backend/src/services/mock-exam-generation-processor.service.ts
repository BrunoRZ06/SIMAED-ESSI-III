import {
  GenerationStatus,
} from "../../generated/prisma/client.js";

import {
  GeminiAIClient,
} from "../ai/clients/gemini-ai.client.js";

import type {
  MockExamConfigInput,
} from "../schemas/mock-exam.schema.js";

import {
  generateMockExamWithAI,
} from "./mock-exam-ai-generation.service.js";

import {
  buildMockExamGenerationInput,
} from "./mock-exam-generation-context.service.js";

import {
  markMockExamGenerationAsFailed,
  updateMockExamGenerationStatus,
} from "./mock-exam-generation.service.js";

export async function processMockExamGeneration(
  requestId: string,
  config: MockExamConfigInput
) {
  try {
    await updateMockExamGenerationStatus(
      requestId,
      GenerationStatus.PROCESSING
    );

    const input =
      await buildMockExamGenerationInput(
        requestId,
        config
      );

    const aiClient =
      new GeminiAIClient();

    const exam =
      await generateMockExamWithAI(
        input,
        aiClient
      );

    await updateMockExamGenerationStatus(
      requestId,
      GenerationStatus.COMPLETED
    );

    return {
      success: true as const,
      requestId,
      status:
        GenerationStatus.COMPLETED,
      exam,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro desconhecido durante a geração.";

    await markMockExamGenerationAsFailed(
      requestId,
      errorMessage
    ).catch(() => undefined);

    return {
      success: false as const,
      requestId,
      status:
        GenerationStatus.FAILED,
      error:
        errorMessage,
    };
  }
}