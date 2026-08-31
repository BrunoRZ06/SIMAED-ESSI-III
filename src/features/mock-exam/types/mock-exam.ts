export type SubjectArea = "portuguese" | "mathematics" | null;
export type DifficultyLevel = "easy" | "medium" | "hard";
export type QuestionType = "previous" | "new" | "combined";

export interface MockExamConfig {
  area: SubjectArea;
  grade: string;
  questionCount: number;
  difficulty: DifficultyLevel;
  skills: string[];
  questionType: QuestionType;
}