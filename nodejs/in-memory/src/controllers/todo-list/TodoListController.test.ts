import { TodoListError } from "../../models/todo-list/TodoList.errors";
import { TodoListController } from "./TodoListController";
import { Todo } from "../../models/Todo";

const generateRandomNumber = (max: number = 10, min: number = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

describe("TodoListController", () => {
  describe("Creating a todo", () => {
    it(`should throw the TodoAlreadyExists error when try to add an already existent todo`, () => {
      const sut = new TodoListController();
      sut.create("My first todo");
      expect(() => {
        sut.create("My first todo");
      }).toThrow(
        new TodoListError({
          name: "TODO_ALREADY_EXISTS",
          message:
            "This todo already exist. Please choose another title for this new todo.",
          cause: undefined,
        })
      );
    });

    it("should add a new todo-item into the list correctly", () => {
      const sut = new TodoListController();
      const todo = sut.create("My first todo");
      const allTodos = sut.readAll();
      expect(allTodos).toContain(todo);
    });
  });

  describe("Reading todos", () => {
    describe("Reading all", () => {
      it("should have an empty array when there is not todos registered", () => {
        const sut = new TodoListController();
        const allTodos = sut.readAll();
        expect(allTodos).toEqual([]);
      });

      it("should read all todos correctly", () => {
        const numberOfTodos = generateRandomNumber();
        const sut = new TodoListController();
        for (let i = 0; i < numberOfTodos; i++) {
          sut.create(`${i + 1} Todo`);
        }
        expect(sut.readAll().length).toEqual(numberOfTodos);
        const allTodos = sut.readAll();
        for (let i = 0; i < numberOfTodos; i++) {
          expect(allTodos[i].description).toEqual(`${i + 1} Todo`);
        }
      });
    });

    describe("Reading by id", () => {
      it(`should return "undefined" when the desired todo doesn't exist`, () => {
        const sut = new TodoListController();
        const todoFromList = sut.readById("SOME_ID_THAT_DOESNT_EXIST");
        expect(todoFromList).toBeUndefined();
      });

      it("should read a todo by id correctly", () => {
        const sut = new TodoListController();
        const todo = sut.create("My first todo");
        const todoFromList = sut.readById(todo.id);
        expect(todoFromList).toEqual(todo);
      });
    });
  });

  describe("Updating a todo", () => {
    it(`should throw the UpdateUnexistentTodo error when try to update a todo that doesn't exist`, () => {
      const sut = new TodoListController();
      const todo = new Todo("My first todo");
      expect(() => {
        sut.update(todo);
      }).toThrow(
        new TodoListError({
          name: "UPDATING_NON_EXISTENT_TODO",
          message: "Not possible to update a non-existent todo.",
          cause: undefined,
        })
      );
    });

    it("should update a todo correctly when the todo exists", () => {
      const sut = new TodoListController();
      const todo = sut.create("My first todo");
      sut.update({
        id: todo.id,
        description: "Description updated",
      });
      const allTodos = sut.readAll();
      expect(allTodos).toContain(todo);
    });
  });

  describe("Deleting a todo", () => {
    it(`should return "undefined" if the todo doesn't exist"`, () => {
      const sut = new TodoListController();
      expect(() => {
        sut.delete("DELETING_NON_EXISTENT_TODO");
      }).toThrow(
        new TodoListError({
          name: "UPDATING_NON_EXISTENT_TODO",
          message: "Not possible to delete a non-existent todo.",
          cause: undefined,
        })
      );
    });

    it("should remove the todo correctly", () => {
      const sut = new TodoListController();
      const todo = sut.create("My first todo");
      expect(sut.readAll()).toContain(todo);
      sut.delete(todo.id);
      expect(sut.readAll()).not.toContain(todo);
    });
  });
});
