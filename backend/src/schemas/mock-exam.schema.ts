import { z } from "zod";

export const mockExamConfigSchema = z.object({
  disciplineCode: z.string().min(1, {
    message: "A disciplina é obrigatória.",
  }),

  stageCode: z.string().min(1, {
    message: "A série é obrigatória.",
  }),

  descriptorIds: z
    .array(
      z.string().uuid({
        message: "Identificador de habilidade inválido.",
      })
    )
    .min(1, {
      message: "Selecione pelo menos uma habilidade.",
    }),

  questionCount: z
    .number({
      message: "A quantidade de questões é obrigatória.",
    })
    .int({
      message: "A quantidade de questões deve ser um número inteiro.",
    })
    .refine(
      (value) => [10, 15, 20].includes(value),
      {
        message:
          "A quantidade de questões deve ser 10, 15 ou 20.",
      }
    ),

  difficulty: z.enum(
    ["easy", "medium", "hard"],
    {
      message: "Nível de dificuldade inválido.",
    }
  ),

  questionType: z.enum(
    ["previous", "new", "combined"],
    {
      message: "Tipo de questão inválido.",
    }
  ),
});

export type MockExamConfigInput =
  z.infer<typeof mockExamConfigSchema>;