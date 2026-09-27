import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { mockExamConfigSchema } from "../schemas/mock-exam.schema.js";
import { validateMockExamConfiguration } from "../services/mock-exam-validation.service.js";
import { mapZodErrors } from "../utils/zod-validation-error.js";
import { sendValidationErrors } from "../utils/validation-response.js";

export async function validateMockExamRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result =
    mockExamConfigSchema.safeParse(req.body);

  if (!result.success) {
    return sendValidationErrors(
      res,
      mapZodErrors(result.error)
    );
  }

  const errors =
    await validateMockExamConfiguration(
      result.data
    );

  if (errors.length > 0) {
    return sendValidationErrors(
      res,
      errors
    );
  }

  res.locals.mockExamConfig =
    result.data;

  next();
}