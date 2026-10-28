import { z } from "zod";

export const questionBankQuerySchema = z.object({
  year: z.coerce.number().int().min(2000).max(2100).optional(),
  stageCode: z.string().min(1).optional(),
  disciplineCode: z.string().min(1).optional(),
  descriptorCode: z.string().min(1).optional(),
  reviewStatus: z.enum(["NEEDS_REVIEW", "REVIEWED"]).optional(),
  sourceType: z.enum(["HISTORICAL", "ORIGINAL_PRACTICE"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export type QuestionBankQuery = z.infer<typeof questionBankQuerySchema>;
