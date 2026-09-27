import type { Response } from "express";

import type { ValidationError } from "../types/validation-error.js";

export function sendValidationErrors(
  res: Response,
  errors: ValidationError[]
) {
  return res.status(400).json({
    valid: false,
    errors,
  });
}