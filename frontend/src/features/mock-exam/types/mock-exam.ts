export type SubjectArea =
  | "portuguese"
  | "mathematics"
  | null;

export type DifficultyLevel =
  | "easy"
  | "medium"
  | "hard";

export type QuestionType =
  | "previous"
  | "new"
  | "combined";

export interface MockExamConfig {
  area: SubjectArea;

  // Código da série vindo do backend:
  // 2EF, 5EF, 9EF, 3EM
  grade: string;

  questionCount: number;

  difficulty: DifficultyLevel;

  // IDs dos descritores selecionados
  skills: string[];

  questionType: QuestionType;
}