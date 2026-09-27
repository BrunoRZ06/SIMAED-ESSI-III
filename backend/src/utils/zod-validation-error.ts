import type { ZodError } from "zod";

import type {
  ValidationError,
  ValidationErrorCode,
} from "../types/validation-error.js";

export function mapZodErrors(
  error: ZodError
): ValidationError[] {
  return error.issues.map((issue) => {
    let code: ValidationErrorCode =
      "INVALID_VALUE";

    if (issue.code === "invalid_type") {
      code = "INVALID_FORMAT";
    }

    return {
      code,
      field: issue.path.join("."),
      message: issue.message,
    };
  });
}