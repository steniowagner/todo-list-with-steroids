import { DescriptionErrors } from "./Description.errors";

export const MAX_CHARACTERS = 255;
export const MIN_CHARATERS = 2;

export class Description {
  private constructor(private description: string) {}

  get value() {
    return this.description;
  }

  set value(description: string) {
    Description.handleValidate(description);
    this.description = description;
  }

  private static handleValidate(description: string) {
    if (!Description.validate(description)) {
      throw new DescriptionErrors({
        name: "INVALID_DESCRIPTION",
        message: "Invalid description",
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

  static create(description: string) {
    this.handleValidate(description);
    return new Description(description);
  }
}
