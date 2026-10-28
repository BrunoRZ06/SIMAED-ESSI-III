import {
  GenerationStatus,
} from "../../generated/prisma/client.js";
import { TransientAIError } from "../errors/transient-ai.error.js";

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
  generateMockExamFromArchive,
} from "./archived-question-generation.service.js";
import { findReusableAIGeneratedQuestions } from "./mock-exam-ai-cache.service.js";
import {
  validateGeneratedMockExam,
} from "./generated-mock-exam-validation.service.js";
import { getMockExamQuestionDistribution } from "./mock-exam-question-distribution.service.js";

import {
  completeMockExamGeneration,
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

    const { archivedQuestionCount, aiQuestionCount } =
      getMockExamQuestionDistribution(config);

    const archivedExam = archivedQuestionCount > 0
      ? await generateMockExamFromArchive(input, archivedQuestionCount)
      : { questions: [] };

    let aiExam = { questions: [] as typeof archivedExam.questions };
    if (aiQuestionCount > 0) {
      try {
        aiExam = await generateMockExamWithAI(
          {
            ...input,
            questionCount: aiQuestionCount,
            questionType: "new",
          },
          new GeminiAIClient(),
        );
      } catch (error) {
        if (!(error instanceof TransientAIError)) {
          throw error;
        }

        const cachedQuestions = await findReusableAIGeneratedQuestions(
          config,
          requestId,
          aiQuestionCount,
        );

        if (cachedQuestions.length < aiQuestionCount) {
          throw new Error(
            `${error.message} Não há questões inéditas anteriores suficientes com os mesmos parâmetros (${cachedQuestions.length}/${aiQuestionCount}).`,
          );
        }

        console.warn(
          `IA indisponível (${error.code}); reutilizando ${cachedQuestions.length} questão(ões) de uma geração anterior com os mesmos parâmetros.`,
        );
        aiExam = { questions: cachedQuestions };
      }
    }

    const exam = {
      questions: [
        ...archivedExam.questions,
        ...aiExam.questions.map((question) => ({
          ...question,
          questionType: "new" as const,
        })),
      ],
    };

    validateGeneratedMockExam(exam, input);

    await completeMockExamGeneration(
      requestId,
      config.questionType,
      exam
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
