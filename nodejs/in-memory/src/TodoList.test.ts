import { TodoList } from "./TodoList";
import { Todo } from "./Todo";

const generateRandomNumber = (max: number = 10, min: number = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

describe("TodoList", () => {
  describe("Creating a todo", () => {
    it(`should not allow to create a todo with the "description"`, () => {
      const sut = new TodoList();
      const newTodo = new Todo("My first todo");
      sut.add(newTodo);
      sut.add(newTodo);
      const todosWithSameDescription = sut.todos.filter(
        (todo) => todo.description === newTodo.description
      );
      expect(todosWithSameDescription.length).toEqual(1);
    });

    it("should add a new todo-item into the list correctly", () => {
      const sut = new TodoList();
      const todo = new Todo("My first todo");
      sut.add(todo);
      expect(sut.todos).toContain(todo);
    });
  });

  describe("Reading todos", () => {
    describe("Reading all", () => {
      it("should have an empty array when there is not todos registered", () => {
        const sut = new TodoList();
        const allTodos = sut.readAll();
        expect(allTodos).toEqual([]);
      });

      it("should read all todos correctly", () => {
        const numberOfTodos = generateRandomNumber();
        const sut = new TodoList();
        for (let i = 0; i < numberOfTodos; i++) {
          sut.add(new Todo(`${i + 1} Todo`));
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
        const sut = new TodoList();
        const todoFromList = sut.readById("SOME_ID_THAT_DOESNT_EXIST");
        expect(todoFromList).toBeUndefined();
      });

      it("should read a todo by id correctly", () => {
        const todo = new Todo("My first todo");
        const sut = new TodoList();
        sut.add(todo);
        const todoFromList = sut.readById(todo.id);
        expect(todoFromList).toEqual(todo);
      });
    });
  });

  describe("Updating a todo", () => {
    it(`should return "undefined" when the target todo doesnt exist`, () => {
      const sut = new TodoList();
      const todo = sut.readById("SOME_ID_THAT_DOESNT_EXIST");
      expect(todo).toBeUndefined();
    });

    it("should update a todo correctly when the todo exists", () => {
      const sut = new TodoList();
      const todo = new Todo("My first todo");
      sut.add(todo);
      todo.description = "My first todo updated";
      todo.finish();
      sut.update(todo);
      expect(sut.todos).toContain(todo);
    });
  });

  describe("Deleting a todo", () => {
    it(`should return "undefined" if the todo doesn't exist"`, () => {
      const sut = new TodoList();
      const deletedTodo = sut.delete("SOME_ID_THAT_DOESNT_EXIST");
      expect(deletedTodo).toBeUndefined();
    });

    it("should remove the todo correctly", () => {
      const sut = new TodoList();
      const todo = new Todo("My first todo");
      sut.add(todo);
      expect(sut.todos).toContain(todo);
      sut.delete(todo.id);
      expect(sut.todos).not.toContain(todo);
    });
  });
});
