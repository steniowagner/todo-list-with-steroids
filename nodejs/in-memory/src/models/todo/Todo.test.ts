import {
  MAX_CHARACTERS as DESCRIPTION_MAX_CHARACTERS,
  MIN_CHARATERS as DESCRIPTION_MIN_CHARATERS,
} from "./description/Description";
import {
  MAX_CHARACTERS as FLAG_MAX_CHARACTERS,
  MIN_CHARATERS as FLAG_MIN_CHARATERS,
} from "../flag/Flag";
import { DescriptionErrors } from "./description/Description.errors";
import { FlagErrors } from "../flag/Flag.errors";
import { Priority } from "./Priority";
import { Todo } from "./Todo";

const invalidDescriptionTooFewCharacters = {
  description: Array(DESCRIPTION_MIN_CHARATERS - 1)
    .fill("x")
    .join(""),
};
const invalidDescriptionTooManyCharacters = {
  description: Array(DESCRIPTION_MAX_CHARACTERS + 1)
    .fill("x")
    .join(""),
};
const InvalidDescriptionError = new DescriptionErrors({
  name: "INVALID_DESCRIPTION",
  message: "Invalid description",
  cause: undefined,
});
const validDescription = { description: "Some valid description" };

const invalidFlagTooFewCharacters = Array(FLAG_MIN_CHARATERS - 1)
  .fill("x")
  .join("");
const invalidFlagTooManyCharacters = Array(FLAG_MAX_CHARACTERS + 1)
  .fill("x")
  .join("");
const InvalidFlagError = new FlagErrors({
  name: "INVALID_FLAG",
  message: "Invalid Flag",
  cause: undefined,
});
const validFlag = "Some valida Flag";

describe("Todo", () => {
  describe("Creating a Todo", () => {
    it('should create a Todo correctly when the "description" is valid', () => {
      const sut = Todo.create(validDescription);
      expect(typeof sut.id).toEqual("string");
      expect(sut.description).toEqual(validDescription.description);
      expect(sut.isFinished).toEqual(false);
      expect(sut.priority).toEqual(Priority.LOW);
      expect(sut.isFlagged).toEqual(false);
      expect(sut.isFlagged).toEqual(false);
      expect(sut.flag).toBeUndefined();
    });

    it("should create a Todo with a custom priority", () => {
      const sut = Todo.create({ ...validDescription, priority: Priority.HIGH });
      expect(typeof sut.id).toEqual("string");
      expect(sut.priority).toEqual(Priority.HIGH);
    });

    it(`should not create a Todo when the "description" has less than ${DESCRIPTION_MIN_CHARATERS} characters`, () => {
      expect(() => {
        Todo.create(invalidDescriptionTooFewCharacters);
      }).toThrow(InvalidDescriptionError);
    });

    it(`should not create a Todo when the "description" has more than ${DESCRIPTION_MAX_CHARACTERS} characters`, () => {
      expect(() => {
        Todo.create(invalidDescriptionTooManyCharacters);
      }).toThrow(InvalidDescriptionError);
    });
  });

  describe("Editing a Todo", () => {
    describe("Editing the description", () => {
      it('should edit a Todo correctly when the "description" is valid', () => {
        const updatedDescription = "Some other valid description";
        const sut = Todo.create(validDescription);
        expect(sut.description).toEqual(validDescription.description);
        sut.description = updatedDescription;
        expect(sut.description).toEqual(updatedDescription);
      });

      it("should edit the priority of a Todo", () => {
        const sut = Todo.create(validDescription);
        expect(sut.priority).toEqual(Priority.LOW);
        sut.priority = Priority.HIGH;
        expect(sut.priority).toEqual(Priority.HIGH);
      });

      it('should throw the "InvalidDescriptionError" error when the new "description" is invalid (too few characters)', () => {
        const sut = Todo.create(validDescription);
        expect(sut.description).toEqual(validDescription.description);
        expect(() => {
          Todo.create(invalidDescriptionTooFewCharacters);
        }).toThrow(InvalidDescriptionError);
      });

      it('should throw the "InvalidDescriptionError" error when the new "description" is invalid (too many characters)', () => {
        const sut = Todo.create(validDescription);
        expect(sut.description).toEqual(validDescription.description);
        expect(() => {
          Todo.create(invalidDescriptionTooManyCharacters);
        }).toThrow(InvalidDescriptionError);
      });
    });
  });

  describe("Finishing a Todo", () => {
    it('should mark a Todo as "Finished" when it is finished', () => {
      const sut = Todo.create(validDescription);
      expect(sut.isFinished).toEqual(false);
      sut.finish();
      expect(sut.isFinished).toEqual(true);
    });

    it('should "Unfinish" a "Finished" Todo', () => {
      const sut = Todo.create(validDescription);
      expect(sut.isFinished).toEqual(false);
      sut.finish();
      expect(sut.isFinished).toEqual(true);
      sut.unfinish();
      expect(sut.isFinished).toEqual(false);
    });
  });

  describe("Flagging a Todo", () => {
    it('should mark the Todo as "Flagged" when it has a valid flag', () => {
      const sut = Todo.create(validDescription);
      expect(sut.isFlagged).toEqual(false);
      sut.addFlag(validFlag);
      expect(sut.isFlagged).toEqual(true);
    });

    it('should "Remove" a "Flag" from the Todo', () => {
      const sut = Todo.create(validDescription);
      expect(sut.isFlagged).toEqual(false);
      sut.addFlag(validFlag);
      expect(sut.isFlagged).toEqual(true);
      sut.removeFlag();
      expect(sut.isFlagged).toEqual(false);
    });

    describe('When the "Flag-reason" is invalid', () => {
      it(`should not "Flag" a Todo when the "Flag-reason" has less than ${FLAG_MIN_CHARATERS} characters`, () => {
        const sut = Todo.create(validDescription);
        expect(sut.isFlagged).toEqual(false);
        expect(() => {
          sut.addFlag(invalidFlagTooFewCharacters);
        }).toThrow(InvalidFlagError);
      });

      it(`should not "Flag" a Todo when the "Flag-reason" has more than ${FLAG_MAX_CHARACTERS} characters`, () => {
        const sut = Todo.create(validDescription);
        expect(sut.isFlagged).toEqual(false);
        expect(() => {
          sut.addFlag(invalidFlagTooManyCharacters);
        }).toThrow(InvalidFlagError);
      });
    });
  });
});
