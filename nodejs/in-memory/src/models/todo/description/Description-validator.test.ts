import { Description, MAX_CHARACTERS, MIN_CHARATERS } from "./Description";

describe("Todo/Description", () => {
  it("should create the Description correctly when it is valid", () => {
    expect(Description.validate("some valid description")).toEqual(true);
  });

  it('should throw the "DescriptionErrors" correctly when the value is an "empty string"', () => {
    expect(Description.validate("")).toEqual(false);
  });

  it('should throw the "DescriptionErrors" correctly when the value has less than 2 characters"', () => {
    const invalidDescription = Array(MIN_CHARATERS - 1)
      .fill("x")
      .join("");
    expect(Description.validate(invalidDescription)).toEqual(false);
  });

  it('should throw the "DescriptionErrors" correctly when the value has more than 255 characters"', () => {
    const invalidDescription = Array(MAX_CHARACTERS + 1)
      .fill("x")
      .join("");
    expect(Description.validate(invalidDescription)).toEqual(false);
  });

  it('should throw the "DescriptionErrors" correctly when the value has just empty spaces"', () => {
    expect(Description.validate("   ")).toEqual(false);
  });
});
