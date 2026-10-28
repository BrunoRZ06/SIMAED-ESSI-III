import { beforeEach, describe, expect, it, vi } from "vitest";

const findManyMock = vi.hoisted(() => vi.fn());

vi.mock("../src/lib/prisma.js", () => ({
  prisma: {
    mockExamGenerationRequest: {
      findMany: findManyMock,
    },
  },
}));

import { findReusableAIGeneratedQuestions } from "../src/services/mock-exam-ai-cache.service.js";

const config = {
  disciplineCode: "PORTUGUESE",
  stageCode: "3EM",
  descriptorIds: ["descriptor-a", "descriptor-b"],
  questionCount: 10,
  difficulty: "medium" as const,
  questionType: "new" as const,
};

function storedQuestion(position: number) {
  return {
    statement: `Questão reutilizável ${position}`,
    correctAnswer: "A",
    descriptorId: "descriptor-a",
    difficulty: "medium",
    alternatives: [
      { label: "A", text: "Alternativa A" },
      { label: "B", text: "Alternativa B" },
      { label: "C", text: "Alternativa C" },
      { label: "D", text: "Alternativa D" },
    ],
  };
}

describe("findReusableAIGeneratedQuestions", () => {
  beforeEach(() => {
    findManyMock.mockReset();
  });

  it("only reuses complete AI questions from a completed request with matching parameters", async () => {
    findManyMock.mockResolvedValue([
      {
        descriptorIds: ["descriptor-a", "descriptor-b", "extra-descriptor"],
        questions: [storedQuestion(99)],
      },
      {
        descriptorIds: ["descriptor-b", "descriptor-a"],
        questions: [
          storedQuestion(1),
          {
            ...storedQuestion(2),
            alternatives: [
              { label: "A", text: "Alternativa A" },
              { label: "B", text: "Alternativa B" },
            ],
          },
          {
            ...storedQuestion(3),
            difficulty: "hard",
          },
          storedQuestion(4),
        ],
      },
    ]);

    const questions = await findReusableAIGeneratedQuestions(
      config,
      "current-request",
      2,
    );

    expect(questions.map(({ statement }) => statement)).toEqual([
      "Questão reutilizável 1",
      "Questão reutilizável 4",
    ]);
    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          requestId: { not: "current-request" },
          disciplineCode: config.disciplineCode,
          stageCode: config.stageCode,
          descriptorIds: { hasEvery: ["descriptor-a", "descriptor-b"] },
          questionCount: config.questionCount,
          difficulty: config.difficulty,
          questionType: config.questionType,
        }),
      }),
    );
  });

  it("returns the available matching questions so the caller can report an insufficient cache", async () => {
    findManyMock.mockResolvedValue([
      {
        descriptorIds: ["descriptor-a", "descriptor-b"],
        questions: [storedQuestion(1), storedQuestion(2)],
      },
    ]);

    const questions = await findReusableAIGeneratedQuestions(
      config,
      "current-request",
      5,
    );

    expect(questions).toHaveLength(2);
  });
});
