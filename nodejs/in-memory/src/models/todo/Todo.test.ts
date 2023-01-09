import { DateTime } from "luxon";
import {
  MAX_CHARACTERS as DESCRIPTION_MAX_CHARACTERS,
  MIN_CHARATERS as DESCRIPTION_MIN_CHARATERS,
} from "./description/Description";
import { DescriptionErrors } from "./description/Description.errors";
import { Status } from "./Status";
import { Todo } from "./Todo";

interface MakeValidTodoParams {
  now?: DateTime;
  status?: Status;
}

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

const makeValidTodo = (params?: MakeValidTodoParams) =>
  Todo.create({
    description: validDescription,
    now: params?.now || DateTime.now(),
    status: params?.status,
  });

const makeInvalidTodo = (description: string) =>
  Todo.create({
    now: DateTime.now(),
    description,
  });

describe("Todo", () => {
  describe("Creating a Todo", () => {
    it('should create a Todo correctly when the "description" is valid', () => {
      const sut = makeValidTodo();
      expect(typeof sut.id).toEqual("string");
      expect(typeof sut.createdAt).toEqual("string");
      expect(sut.description).toEqual(validDescription);
      expect(sut.isFinished).toEqual(false);
      expect(sut.status).toEqual(Status.TODO);
    });

    it('should create a "Todo" with custom "createdAt" field correctly when it is provided', () => {
      const now = DateTime.now();
      const sut = makeValidTodo({ now });
      expect(sut.createdAt).toEqual(now.toString());
    });

    it(`should not create a Todo when the "description" has less than ${DESCRIPTION_MIN_CHARATERS} characters`, () => {
      expect(() => {
        makeInvalidTodo(invalidDescriptionTooFewCharacters);
      }).toThrow(InvalidDescriptionError);
    });

    it(`should not create a Todo when the "description" has more than ${DESCRIPTION_MAX_CHARACTERS} characters`, () => {
      expect(() => {
        makeInvalidTodo(invalidDescriptionTooManyCharacters);
      }).toThrow(InvalidDescriptionError);
    });
  });

  describe("Editing a Todo", () => {
    describe("Editing the description", () => {
      it('should edit a Todo correctly when the "description" is valid', () => {
        const updatedDescription = "Some other valid description";
        const sut = makeValidTodo();
        expect(sut.description).toEqual(validDescription);
        sut.description = updatedDescription;
        expect(sut.description).toEqual(updatedDescription);
      });

      it('should throw the "InvalidDescriptionError" error when the new "description" is invalid (too few characters)', () => {
        const sut = makeValidTodo();
        expect(sut.description).toEqual(validDescription);
        expect(() => {
          sut.description = invalidDescriptionTooFewCharacters;
        }).toThrow(InvalidDescriptionError);
      });

      it('should throw the "InvalidDescriptionError" error when the new "description" is invalid (too many characters)', () => {
        const sut = makeValidTodo();
        expect(sut.description).toEqual(validDescription);
        expect(() => {
          sut.description = invalidDescriptionTooManyCharacters;
        }).toThrow(InvalidDescriptionError);
      });
    });
  });

  describe('Changing the "Status"', () => {
    it('should change the "status" to "STARTED" when the "Todo" is "started"', () => {
      const sut = makeValidTodo();
      expect(sut.status).toEqual(Status.TODO);
      sut.start();
      expect(sut.status).toEqual(Status.DOING);
    });
  });

  describe("Finishing a Todo", () => {
    it('should mark a Todo as "Finished" when it is finished', () => {
      const sut = makeValidTodo();
      expect(sut.isFinished).toEqual(false);
      sut.finish();
      expect(sut.isFinished).toEqual(true);
    });

    it('should "Unfinish" a "Finished" Todo', () => {
      const sut = makeValidTodo();
      expect(sut.isFinished).toEqual(false);
      sut.finish();
      expect(sut.isFinished).toEqual(true);
      sut.unfinish();
      expect(sut.isFinished).toEqual(false);
    });
  });
});
