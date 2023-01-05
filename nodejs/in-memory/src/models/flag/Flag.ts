import { FlagErrors } from "./Flag.errors";

export const MAX_CHARACTERS = 255;
export const MIN_CHARATERS = 2;

export class Flag {
  private constructor(private reason: string) {}

  get value() {
    return this.reason;
  }

  set value(reason: string) {
    this.reason = reason;
  }

  private static handleValidate(description: string) {
    if (!Flag.validate(description)) {
      throw new FlagErrors({
        name: "INVALID_FLAG",
        message: "Invalid Flag",
        cause: undefined,
      });
    }
  }

  static validate(description: string) {
    return (
      !!description &&
      description.trim().length >= MIN_CHARATERS &&
      description.trim().length <= MAX_CHARACTERS
    );
  }

  static create(reason: string) {
    this.handleValidate(reason);
    return new Flag(reason);
  }
}
