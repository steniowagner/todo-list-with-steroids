import { Flag, MAX_CHARACTERS, MIN_CHARATERS } from "./Flag";

describe("Flag", () => {
  it("should create the Flag correctly when it is valid", () => {
    expect(Flag.validate("some valid Flag")).toEqual(true);
  });

  it('should throw the "FlagErrors" correctly when the value is an "empty string"', () => {
    expect(Flag.validate("")).toEqual(false);
  });

  it('should throw the "FlagErrors" correctly when the value has less than 2 characters"', () => {
    const invalidFlag = Array(MIN_CHARATERS - 1)
      .fill("x")
      .join("");
    expect(Flag.validate(invalidFlag)).toEqual(false);
  });

  it('should throw the "FlagErrors" correctly when the value has more than 255 characters"', () => {
    const invalidFlag = Array(MAX_CHARACTERS + 1)
      .fill("x")
      .join("");
    expect(Flag.validate(invalidFlag)).toEqual(false);
  });

  it('should throw the "FlagErrors" correctly when the value has just empty spaces"', () => {
    expect(Flag.validate("   ")).toEqual(false);
  });
});
