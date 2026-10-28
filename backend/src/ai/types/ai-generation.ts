export interface GenerationDescriptor {
  id: string;
  code: string;
  description: string;
}

export type GenerationDifficulty =
  | "easy"
  | "medium"
  | "hard";

export type GenerationQuestionType =
  | "previous"
  | "new"
  | "combined";

export interface MockExamGenerationInput {
  requestId: string;

  discipline: {
    code: string;
    name: string;
  };

  stage: {
    code: string;
    name: string;
  };

  questionCount: number;

  difficulty:
    GenerationDifficulty;

  questionType:
    GenerationQuestionType;

  descriptors:
    GenerationDescriptor[];
}
