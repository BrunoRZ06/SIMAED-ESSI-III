import type { MockExamConfigInput } from "../schemas/mock-exam.schema.js";

export function getMockExamQuestionDistribution(
  config: Pick<MockExamConfigInput, "questionCount" | "questionType">,
) {
  const archivedQuestionCount = config.questionType === "previous"
    ? config.questionCount
    : config.questionType === "combined"
      ? Math.floor(config.questionCount / 2)
      : 0;

  return {
    archivedQuestionCount,
    aiQuestionCount: config.questionCount - archivedQuestionCount,
  };
}
