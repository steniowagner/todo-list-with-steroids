import { DescriptionErrors } from "./Description.errors";

export const MAX_CHARACTERS = 255;
export const MIN_CHARATERS = 2;

export class Description {
  private readonly description: string;

  private constructor(description: string) {
    this.description = description;
    Object.freeze(this);
  }

  get value() {
    return this.description;
  }

  static validate(description: string) {
    return (
      !!description &&
      description.trim().length > MIN_CHARATERS &&
      description.trim().length <= MAX_CHARACTERS
    );
  }

  static create(description: string) {
    if (!Description.validate(description)) {
      throw new DescriptionErrors({
        name: "INVALID_DESCRIPTION",
        message: "Invalid description",
        cause: undefined,
      });
    }
    return new Description(description);
  }
}
