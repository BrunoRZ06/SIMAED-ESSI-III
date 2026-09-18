import type {
  Request,
  Response,
} from "express";

import { mockExamConfigSchema } from "../schemas/mock-exam.schema.js";

import {
  validateDescriptorCompatibility,
  validateDisciplineStageCompatibility,
  validateParameterAvailability,
} from "../services/mock-exam-validation.service.js";

export async function validateMockExamConfig(
  req: Request,
  res: Response
) {
  const result = mockExamConfigSchema.safeParse(
    req.body
  );

  if (!result.success) {
    const errors = result.error.issues.map(
      (issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })
    );

    return res.status(400).json({
      valid: false,
      errors,
    });
  }

  const availabilityErrors =
    await validateParameterAvailability(
      result.data
    );

  if (availabilityErrors.length > 0) {
    return res.status(400).json({
      valid: false,
      errors: availabilityErrors,
    });
  }

  const disciplineStageErrors =
    await validateDisciplineStageCompatibility(
      result.data
    );

  if (disciplineStageErrors.length > 0) {
    return res.status(400).json({
      valid: false,
      errors: disciplineStageErrors,
    });
  }

  const descriptorErrors =
    await validateDescriptorCompatibility(
      result.data
    );

  if (descriptorErrors.length > 0) {
    return res.status(400).json({
      valid: false,
      errors: descriptorErrors,
    });
  }

  return res.status(200).json({
    valid: true,
    data: result.data,
  });
}