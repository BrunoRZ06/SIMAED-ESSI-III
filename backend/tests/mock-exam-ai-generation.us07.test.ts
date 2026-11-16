import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { AIClient } from "../src/ai/clients/ai-client.js";
import type { MockExamGenerationInput } from "../src/ai/types/ai-generation.js";
import { buildMockExamPrompt } from "../src/ai/prompts/mock-exam.prompt.js";
import { parseGeneratedMockExam } from "../src/ai/parsers/generated-question.parser.js";
import { validateGeneratedCorrectAnswers } from "../src/services/generated-mock-exam-validation.service.js";
import { generateMockExamWithAI } from "../src/services/mock-exam-ai-generation.service.js";

const descriptorOneId = "11111111-1111-4111-8111-111111111111";
const descriptorTwoId = "22222222-2222-4222-8222-222222222222";

const input: MockExamGenerationInput = {
  requestId: "request-us07",
  discipline: {
    code: "MAT",
    name: "Matemática",
  },
  stage: {
    code: "5EF",
    name: "5º ano do Ensino Fundamental",
  },
  questionCount: 10,
  difficulty: "easy",
  questionType: "new",
  descriptors: [
    {
      id: descriptorOneId,
      code: "D01",
      description: "Resolver problemas de adição.",
    },
    {
      id: descriptorTwoId,
      code: "D02",
      description: "Reconhecer figuras geométricas.",
    },
  ],
};

function generatedQuestion(
  position: number,
  overrides: Record<string, unknown> = {},
) {
  return {
    statement: `Questão de teste ${position}`,
    alternatives: [
      { id: "A", text: `Resposta correta ${position}` },
      { id: "B", text: `Distrator B ${position}` },
      { id: "C", text: `Distrator C ${position}` },
      { id: "D", text: `Distrator D ${position}` },
    ],
    correctAnswer: "A",
    descriptorId: descriptorOneId,
    difficulty: input.difficulty,
    ...overrides,
  };
}

function responseWithCount(
  count: number,
  questionOverrides: Record<string, unknown> = {},
) {
  return JSON.stringify({
    questions: Array.from(
      { length: count },
      (_, index) => generatedQuestion(index + 1, questionOverrides),
    ),
  });
}

function aiClient(response: string): AIClient & { generate: ReturnType<typeof vi.fn> } {
  return {
    generate: vi.fn().mockResolvedValue(response),
  };
}

function firstPrompt(client: ReturnType<typeof aiClient>) {
  const prompt = client.generate.mock.calls[0]?.[0];

  if (typeof prompt !== "string") {
    throw new Error("A IA não recebeu as instruções de geração.");
  }

  return prompt;
}

describe("US07 - Geração de questões com IA", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("US07-CT03 - inclui disciplina e série nas instruções", () => {
    const prompt = buildMockExamPrompt(input);

    expect(prompt).toContain("Matemática");
    expect(prompt).toContain("5º ano do Ensino Fundamental");
    expect(prompt).toContain("Código da disciplina:\nMAT");
    expect(prompt).toContain("Código da série:\n5EF");
  });

  it("US07-CT04 - inclui todas as habilidades selecionadas nas instruções", () => {
    const prompt = buildMockExamPrompt(input);

    expect(prompt).toContain(`${descriptorOneId}\nCódigo: D01`);
    expect(prompt).toContain("Resolver problemas de adição.");
    expect(prompt).toContain(`${descriptorTwoId}\nCódigo: D02`);
    expect(prompt).toContain("Reconhecer figuras geométricas.");
  });

  it.each([
    ["US07-CT05", 10],
    ["US07-CT06", 15],
  ])(
    "%s - retorna exatamente %i questões válidas",
    async (_caseId, questionCount) => {
      const requestInput = { ...input, questionCount };
      const client = aiClient(responseWithCount(questionCount));

      const exam = await generateMockExamWithAI(requestInput, client);

      expect(exam.questions).toHaveLength(questionCount);
      expect(client.generate).toHaveBeenCalledOnce();
    },
  );

  it("US07-CT07 - rejeita resposta com menos questões que o solicitado", async () => {
    const client = aiClient(responseWithCount(9));

    await expect(generateMockExamWithAI(input, client)).rejects.toThrow(
      "Quantidade de questões inválida. Esperado: 10. Recebido: 9.",
    );
    expect(client.generate).toHaveBeenCalledTimes(2);
  });

  it("US07-CT08 - inclui a disciplina selecionada no pedido à IA", async () => {
    const client = aiClient(responseWithCount(10));

    await generateMockExamWithAI(input, client);

    expect(firstPrompt(client)).toContain(input.discipline.name);
  });

  it("US07-CT09 - inclui a série selecionada no pedido à IA", async () => {
    const client = aiClient(responseWithCount(10));

    await generateMockExamWithAI(input, client);

    expect(firstPrompt(client)).toContain(input.stage.name);
  });

  it("US07-CT10 - vincula questões às habilidades selecionadas", async () => {
    const client = aiClient(responseWithCount(10));

    const exam = await generateMockExamWithAI(input, client);

    expect(firstPrompt(client)).toContain(input.descriptors[0]?.description);
    expect(exam.questions.every(
      (question) => input.descriptors.some(
        (descriptor) => descriptor.id === question.descriptorId,
      ),
    )).toBe(true);
  });

  it.each([
    ["US07-CT11", "easy"],
    ["US07-CT12", "medium"],
    ["US07-CT12", "hard"],
  ] as const)(
    "%s - preserva dificuldade %s nas instruções e questões",
    async (_caseId, difficulty) => {
      const requestInput = { ...input, difficulty };
      const client = aiClient(responseWithCount(10, { difficulty }));

      const exam = await generateMockExamWithAI(requestInput, client);

      expect(firstPrompt(client)).toContain(
        `Nível de dificuldade:\n${difficulty}`,
      );
      expect(exam.questions.every(
        (question) => question.difficulty === difficulty,
      )).toBe(true);
    },
  );

  it("US07-CT13 - aceita questão com todos os campos obrigatórios", () => {
    const exam = parseGeneratedMockExam(responseWithCount(1));

    expect(exam.questions[0]).toEqual(expect.objectContaining({
      statement: expect.any(String),
      alternatives: expect.arrayContaining([
        expect.objectContaining({ id: "A", text: expect.any(String) }),
        expect.objectContaining({ id: "B", text: expect.any(String) }),
        expect.objectContaining({ id: "C", text: expect.any(String) }),
        expect.objectContaining({ id: "D", text: expect.any(String) }),
      ]),
      correctAnswer: "A",
      descriptorId: descriptorOneId,
      difficulty: "easy",
    }));
  });

  it("US07-CT14 - identifica questão sem gabarito como resposta inválida", async () => {
    const { correctAnswer: _correctAnswer, ...question } = generatedQuestion(1);
    const client = aiClient(JSON.stringify({ questions: [question] }));

    await expect(generateMockExamWithAI({ ...input, questionCount: 1 }, client))
      .rejects.toThrow("A IA retornou questões com estrutura inválida.");
    expect(client.generate).toHaveBeenCalledTimes(2);
  });

  it("US07-CT15 - rejeita gabarito sem alternativa correspondente", () => {
    expect(() => validateGeneratedCorrectAnswers({
      questions: [{
        statement: "Questão com gabarito sem alternativa.",
        alternatives: [
          { id: "A", text: "Alternativa A" },
          { id: "B", text: "Alternativa B" },
          { id: "B", text: "Alternativa repetida" },
          { id: "C", text: "Alternativa C" },
        ],
        correctAnswer: "D",
        descriptorId: descriptorOneId,
        difficulty: "easy",
      }],
    })).toThrow("O gabarito indicado não corresponde a nenhuma alternativa da questão.");
  });

  it("US07-CT16 - trata resposta fora do formato JSON como falha de geração", async () => {
    const client = aiClient("resposta inválida");

    await expect(generateMockExamWithAI(input, client))
      .rejects.toThrow("A IA retornou um JSON inválido.");
    expect(client.generate).toHaveBeenCalledTimes(2);
  });

  it("US07-CT17 - identifica questão sem habilidade/descritor", async () => {
    const { descriptorId: _descriptorId, ...question } = generatedQuestion(1);
    const client = aiClient(JSON.stringify({ questions: [question] }));

    await expect(generateMockExamWithAI({ ...input, questionCount: 1 }, client))
      .rejects.toThrow("A IA retornou questões com estrutura inválida.");
    expect(client.generate).toHaveBeenCalledTimes(2);
  });
});
