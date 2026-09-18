import type { DifficultyLevel, QuestionType } from "../types/mock-exam";

export const QUESTION_COUNT_OPTIONS = [
  10,
  15,
  20,
];

export const DIFFICULTY_OPTIONS: {
  label: string;
  value: DifficultyLevel;
  customBorder?: string;
}[] = [
  {
    label: "Fácil",
    value: "easy",
  },
  {
    label: "Médio",
    value: "medium",
  },
  {
    label: "Difícil",
    value: "hard",
    customBorder: "#EF4444",
  },
];

export const QUESTION_TYPE_OPTIONS: {
  id: QuestionType;
  label: string;
}[] = [
  {
    id: "previous",
    label: "Questões de provas anteriores",
  },
  {
    id: "new",
    label: "Questões inéditas",
  },
  {
    id: "combined",
    label: "Combinação de anteriores e novas",
  },
];