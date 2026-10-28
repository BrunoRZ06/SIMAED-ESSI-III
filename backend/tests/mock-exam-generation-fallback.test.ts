import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  buildInput: vi.fn(),
  generateWithAI: vi.fn(),
  findReusable: vi.fn(),
  validate: vi.fn(),
  updateStatus: vi.fn(),
  complete: vi.fn(),
  markFailed: vi.fn(),
}));

vi.mock("../src/ai/clients/gemini-ai.client.js", () => ({
  GeminiAIClient: class GeminiAIClient {},
}));
vi.mock("../src/services/mock-exam-ai-generation.service.js", () => ({
  generateMockExamWithAI: mocks.generateWithAI,
}));
vi.mock("../src/services/mock-exam-generation-context.service.js", () => ({
  buildMockExamGenerationInput: mocks.buildInput,
}));
vi.mock("../src/services/archived-question-generation.service.js", () => ({
  generateMockExamFromArchive: vi.fn(),
}));
vi.mock("../src/services/mock-exam-ai-cache.service.js", () => ({
  findReusableAIGeneratedQuestions: mocks.findReusable,
}));
vi.mock("../src/services/generated-mock-exam-validation.service.js", () => ({
  validateGeneratedMockExam: mocks.validate,
}));
vi.mock("../src/services/mock-exam-generation.service.js", () => ({
  completeMockExamGeneration: mocks.complete,
  markMockExamGenerationAsFailed: mocks.markFailed,
  updateMockExamGenerationStatus: mocks.updateStatus,
}));

import { TransientAIError } from "../src/errors/transient-ai.error.js";
import { processMockExamGeneration } from "../src/services/mock-exam-generation-processor.service.js";

const config = {
  disciplineCode: "PORTUGUESE",
  stageCode: "3EM",
  descriptorIds: ["descriptor-a"],
  questionCount: 10,
  difficulty: "medium" as const,
  questionType: "new" as const,
};

function cachedQuestion(position: number) {
  return {
    statement: `Questão em cache ${position}`,
    alternatives: [
      { id: "A" as const, text: "Resposta correta" },
      { id: "B" as const, text: "Alternativa B" },
      { id: "C" as const, text: "Alternativa C" },
      { id: "D" as const, text: "Alternativa D" },
    ],
    correctAnswer: "A" as const,
    descriptorId: "descriptor-a",
    difficulty: "medium" as const,
    questionType: "new" as const,
  };
}

describe("processMockExamGeneration AI fallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.buildInput.mockResolvedValue({
      requestId: "current-request",
      discipline: { code: "PORTUGUESE", name: "Português" },
      stage: { code: "3EM", name: "3ª série do Ensino Médio" },
      questionCount: 10,
      difficulty: "medium",
      questionType: "new",
      descriptors: [
        { id: "descriptor-a", code: "D01", description: "Habilidade" },
      ],
    });
    mocks.updateStatus.mockResolvedValue({});
    mocks.complete.mockResolvedValue({});
    mocks.markFailed.mockResolvedValue({});
  });

  it("completes generation with matching cached AI questions after a transient AI failure", async () => {
    mocks.generateWithAI.mockRejectedValue(
      new TransientAIError("TIMEOUT", "Timeout na comunicação com a IA."),
    );
    mocks.findReusable.mockResolvedValue(
      Array.from({ length: 10 }, (_, index) => cachedQuestion(index + 1)),
    );

    const result = await processMockExamGeneration("current-request", config);

    expect(result.success).toBe(true);
    expect(mocks.findReusable).toHaveBeenCalledWith(config, "current-request", 10);
    expect(mocks.complete).toHaveBeenCalledOnce();
    expect(mocks.markFailed).not.toHaveBeenCalled();
  });

  it("fails with a clear message when the cache has too few matching questions", async () => {
    mocks.generateWithAI.mockRejectedValue(
      new TransientAIError("CONNECTION", "Falha de conexão com o serviço de IA."),
    );
    mocks.findReusable.mockResolvedValue([
      cachedQuestion(1),
      cachedQuestion(2),
    ]);

    const result = await processMockExamGeneration("current-request", config);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain(
        "Não há questões inéditas anteriores suficientes com os mesmos parâmetros (2/10)",
      );
    }
    expect(mocks.complete).not.toHaveBeenCalled();
    expect(mocks.markFailed).toHaveBeenCalledOnce();
  });

  it("does not use the cache for non-transient AI failures", async () => {
    mocks.generateWithAI.mockRejectedValue(new Error("Resposta da IA inválida."));

    const result = await processMockExamGeneration("current-request", config);

    expect(result.success).toBe(false);
    expect(mocks.findReusable).not.toHaveBeenCalled();
    expect(mocks.markFailed).toHaveBeenCalledOnce();
  });
});
