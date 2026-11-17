import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const generateContent = vi.hoisted(() =>
  vi.fn()
);

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    models = {
      generateContent,
    };
  },
}));

process.env.GEMINI_API_KEY = "test-key";
process.env.GEMINI_MODEL = "primary-model";
process.env.GEMINI_FALLBACK_MODEL = "fallback-model";
process.env.GEMINI_RETRY_DELAY_MS = "0";

const { GeminiAIClient } = await import(
  "../src/ai/clients/gemini-ai.client.js"
);
const { TransientAIError } = await import(
  "../src/errors/transient-ai.error.js"
);

function apiError(status: number) {
  return Object.assign(
    new Error(`status ${status}`),
    { status }
  );
}

function timeoutError() {
  return Object.assign(
    new Error("This operation was aborted"),
    { name: "AbortError" }
  );
}

function modelsCalled() {
  return generateContent.mock.calls.map(
    ([request]) => request.model
  );
}

describe("GeminiAIClient (SCRUM-155)", () => {
  beforeEach(() => {
    generateContent.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  it("alterna para o modelo alternativo quando o principal estoura o tempo limite", async () => {
    generateContent
      .mockRejectedValueOnce(timeoutError())
      .mockResolvedValueOnce({ text: '{"questions":[]}' });

    const output = await new GeminiAIClient().generate("prompt");

    expect(output).toBe('{"questions":[]}');
    expect(modelsCalled()).toEqual([
      "primary-model",
      "fallback-model",
    ]);
  });

  it("não repete o modelo principal após timeout", async () => {
    generateContent
      .mockRejectedValueOnce(timeoutError())
      .mockResolvedValueOnce({ text: "{}" });

    await new GeminiAIClient().generate("prompt");

    expect(
      modelsCalled().filter((model) => model === "primary-model")
    ).toHaveLength(1);
  });

  it("alterna para o modelo alternativo quando 503 e timeout se misturam", async () => {
    generateContent
      .mockRejectedValueOnce(apiError(503))
      .mockRejectedValueOnce(timeoutError())
      .mockResolvedValueOnce({ text: "{}" });

    await expect(
      new GeminiAIClient().generate("prompt")
    ).resolves.toBe("{}");

    expect(modelsCalled()).toEqual([
      "primary-model",
      "primary-model",
      "fallback-model",
    ]);
  });

  it("alterna para o modelo alternativo após 503 em todas as tentativas do principal", async () => {
    generateContent
      .mockRejectedValueOnce(apiError(503))
      .mockRejectedValueOnce(apiError(503))
      .mockRejectedValueOnce(apiError(503))
      .mockResolvedValueOnce({ text: "{}" });

    await expect(
      new GeminiAIClient().generate("prompt")
    ).resolves.toBe("{}");

    expect(modelsCalled().at(-1)).toBe("fallback-model");
  });

  it("retorna erro transitório controlado quando os dois modelos falham", async () => {
    generateContent.mockRejectedValue(timeoutError());

    const error = await new GeminiAIClient()
      .generate("prompt")
      .catch((caught) => caught);

    expect(error).toBeInstanceOf(TransientAIError);
    expect(error.code).toBe("TIMEOUT");
    expect(modelsCalled()).toEqual([
      "primary-model",
      "fallback-model",
    ]);
  });

  it("não usa o modelo alternativo para erros não transitórios", async () => {
    generateContent.mockRejectedValue(apiError(400));

    await expect(
      new GeminiAIClient().generate("prompt")
    ).rejects.toThrow("Falha na comunicação com o serviço de IA.");

    expect(modelsCalled()).toEqual(["primary-model"]);
  });

  it("aplica tempo limite de 90s por tentativa por padrão", async () => {
    const timeoutSpy = vi.spyOn(AbortSignal, "timeout");
    generateContent.mockResolvedValueOnce({ text: "{}" });

    await new GeminiAIClient().generate("prompt");

    expect(timeoutSpy).toHaveBeenCalledWith(90_000);
    timeoutSpy.mockRestore();
  });
});
