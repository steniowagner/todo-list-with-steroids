import {
  MAX_CHARACTERS as DESCRIPTION_MAX_CHARACTERS,
  MIN_CHARATERS as DESCRIPTION_MIN_CHARATERS,
} from "./description/Description";
import { DescriptionErrors } from "./description/Description.errors";
import { Status } from "./Status";
import { Todo } from "./Todo";

const invalidDescriptionTooFewCharacters = Array(DESCRIPTION_MIN_CHARATERS - 1)
  .fill("x")
  .join("");
const invalidDescriptionTooManyCharacters = Array(
  DESCRIPTION_MAX_CHARACTERS + 1
)
  .fill("x")
  .join("");
const InvalidDescriptionError = new DescriptionErrors({
  name: "INVALID_DESCRIPTION",
  message: "Invalid description",
  cause: undefined,
});
const validDescription = "Some valid description";

describe("Todo", () => {
  describe("Creating a Todo", () => {
    it('should create a Todo correctly when the "description" is valid', () => {
      const sut = Todo.create(validDescription);
      expect(typeof sut.id).toEqual("string");
      expect(sut.description).toEqual(validDescription);
      expect(sut.isFinished).toEqual(false);
      expect(sut.status).toEqual(Status.TODO);
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
        expect(sut.description).toEqual(validDescription);
        sut.description = updatedDescription;
        expect(sut.description).toEqual(updatedDescription);
      });

      it('should throw the "InvalidDescriptionError" error when the new "description" is invalid (too few characters)', () => {
        const sut = Todo.create(validDescription);
        expect(sut.description).toEqual(validDescription);
        expect(() => {
          Todo.create(invalidDescriptionTooFewCharacters);
        }).toThrow(InvalidDescriptionError);
      });

      it('should throw the "InvalidDescriptionError" error when the new "description" is invalid (too many characters)', () => {
        const sut = Todo.create(validDescription);
        expect(sut.description).toEqual(validDescription);
        expect(() => {
          Todo.create(invalidDescriptionTooManyCharacters);
        }).toThrow(InvalidDescriptionError);
      });
    });
  });

  describe('Changing the Todo "Status"', () => {});

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
});
