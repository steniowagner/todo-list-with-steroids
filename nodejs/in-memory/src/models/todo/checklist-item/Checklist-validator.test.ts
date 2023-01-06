import { ChecklistItem, MAX_CHARACTERS, MIN_CHARATERS } from "./ChecklistItem";

describe("Todo/ChecklistItem", () => {
  it("should create the ChecklistItem correctly when it is valid", () => {
    expect(ChecklistItem.validate("some valid checklist-item")).toEqual(true);
  });

  it('should throw the "ChecklistItemErrors" correctly when the value is an "empty string"', () => {
    expect(ChecklistItem.validate("")).toEqual(false);
  });

  it('should throw the "ChecklistItemErrors" correctly when the value has less than 2 characters"', () => {
    const invalidChecklistItem = Array(MIN_CHARATERS - 1)
      .fill("x")
      .join("");
    expect(ChecklistItem.validate(invalidChecklistItem)).toEqual(false);
  });

  it('should throw the "ChecklistItemErrors" correctly when the value has more than 255 characters"', () => {
    const invalidChecklistItem = Array(MAX_CHARACTERS + 1)
      .fill("x")
      .join("");
    expect(ChecklistItem.validate(invalidChecklistItem)).toEqual(false);
  });

  it('should throw the "ChecklistItemErrors" correctly when the value has just empty spaces"', () => {
    expect(ChecklistItem.validate("   ")).toEqual(false);
  });
});
