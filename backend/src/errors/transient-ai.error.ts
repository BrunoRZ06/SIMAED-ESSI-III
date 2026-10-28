export type TransientAIErrorCode =
  | "CONNECTION"
  | "TIMEOUT"
  | "RATE_LIMIT"
  | "UNAVAILABLE";

export class TransientAIError extends Error {
  readonly code: TransientAIErrorCode;

  constructor(code: TransientAIErrorCode, message: string) {
    super(message);
    this.name = "TransientAIError";
    this.code = code;
  }
}
