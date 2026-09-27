export class MockExamGenerationStartError extends Error {
  requestId: string;

  constructor(
    requestId: string
  ) {
    super(
      "Não foi possível iniciar a geração do simulado."
    );

    this.name =
      "MockExamGenerationStartError";

    this.requestId =
      requestId;
  }
}