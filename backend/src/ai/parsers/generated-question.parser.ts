import {
  generatedMockExamSchema,
} from "../schemas/generated-question.schema.js";

import type {
  GeneratedMockExam,
} from "../schemas/generated-question.schema.js";

function cleanJsonResponse(
  rawResponse: string
) {
  return rawResponse
    .trim()
    .replace(
      /^```json\s*/i,
      ""
    )
    .replace(
      /^```\s*/i,
      ""
    )
    .replace(
      /\s*```$/,
      ""
    )
    .trim();
}

export function parseGeneratedMockExam(
  rawResponse: string
): GeneratedMockExam {
  const cleanedResponse =
    cleanJsonResponse(
      rawResponse
    );

  let parsed: unknown;

  try {
    parsed =
      JSON.parse(
        cleanedResponse
      );
  } catch {
    console.error(
      "Resposta bruta da IA:",
      rawResponse
    );

    throw new Error(
      "A IA retornou um JSON inválido."
    );
  }

  const result =
    generatedMockExamSchema.safeParse(
      parsed
    );

  if (!result.success) {
    console.error(
      "Erros de estrutura da IA:",
      result.error.issues
    );

    throw new Error(
      "A IA retornou questões com estrutura inválida."
    );
  }

  return result.data;
}