import type { MockExamConfigInput } from "../schemas/mock-exam.schema.js";

interface GenerationInput {
  requestId: string;
  config: MockExamConfigInput;
}

export async function dispatchMockExamGeneration(
  input: GenerationInput
) {
  return {
    accepted: true as const,
    requestId: input.requestId,
  };
}