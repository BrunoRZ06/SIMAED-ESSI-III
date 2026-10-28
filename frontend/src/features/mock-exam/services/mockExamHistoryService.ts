import AsyncStorage from "@react-native-async-storage/async-storage";

import type { MockExamValidationPayload } from "@/src/services/mockExamApi";

const HISTORY_KEY = "simaed:visitor:mock-exams:v1";

export type SavedMockExam = Pick<
  MockExamValidationPayload,
  "disciplineCode" | "stageCode" | "questionCount"
> & {
  requestId: string;
  createdAt: string;
};

function isSavedMockExam(value: unknown): value is SavedMockExam {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<SavedMockExam>;
  return typeof entry.requestId === "string"
    && typeof entry.createdAt === "string"
    && typeof entry.disciplineCode === "string"
    && typeof entry.stageCode === "string"
    && typeof entry.questionCount === "number";
}

export async function getSavedMockExams(): Promise<SavedMockExam[]> {
  const serialized = await AsyncStorage.getItem(HISTORY_KEY);
  if (!serialized) return [];

  try {
    const parsed: unknown = JSON.parse(serialized);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedMockExam).sort((first, second) =>
      second.createdAt.localeCompare(first.createdAt)
    );
  } catch {
    return [];
  }
}

export async function saveMockExamToHistory(
  requestId: string,
  config: MockExamValidationPayload,
) {
  const current = await getSavedMockExams();
  const saved: SavedMockExam = {
    requestId,
    disciplineCode: config.disciplineCode,
    stageCode: config.stageCode,
    questionCount: config.questionCount,
    createdAt: new Date().toISOString(),
  };
  const updated = [saved, ...current.filter((entry) => entry.requestId !== requestId)];
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export async function removeMockExamFromHistory(requestId: string) {
  const current = await getSavedMockExams();
  const updated = current.filter((entry) => entry.requestId !== requestId);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}
