export type ValidationErrorCode =
  | "REQUIRED_FIELD"
  | "INVALID_FORMAT"
  | "INVALID_VALUE"
  | "NOT_FOUND"
  | "INACTIVE"
  | "INCOMPATIBLE";

export interface ValidationError {
  code: ValidationErrorCode;
  field: string;
  message: string;
}