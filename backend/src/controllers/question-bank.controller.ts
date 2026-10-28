import type { Request, Response } from "express";
import { questionBankQuerySchema } from "../schemas/question-bank.schema.js";
import { findQuestionBankPage } from "../services/question-bank.service.js";
import { mapZodErrors } from "../utils/zod-validation-error.js";
import { sendValidationErrors } from "../utils/validation-response.js";

export async function getQuestionBank(req: Request, res: Response) {
  const parsedQuery = questionBankQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return sendValidationErrors(res, mapZodErrors(parsedQuery.error));
  }

  try {
    const result = await findQuestionBankPage(parsedQuery.data);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao consultar o acervo de questões:", error);
    return res.status(500).json({
      message: "Não foi possível consultar o acervo de questões.",
    });
  }
}
