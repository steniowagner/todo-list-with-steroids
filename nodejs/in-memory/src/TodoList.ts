import { Todo } from "./Todo";
import { TodoListError } from "./TodoList.errors";

export class TodoList {
  public todos: Todo[];

  constructor() {
    this.todos = [];
  }

  add = (newTodo: Todo) => {
    const isTodoAlredayExists = this.todos.find(
      (todo) => todo.description === newTodo.description
    );
    if (isTodoAlredayExists) {
      throw new TodoListError({
        name: "TODO_ALREADY_EXISTS",
        message:
          "This todo already exist. Please choose another title for this new todo.",
        cause: undefined,
      });
    }
    this.todos.push(newTodo);
  };

  readAll = () => this.todos;

  readById = (id: string) => this.todos.find((todo) => todo.id === id);

  update = (updatedTodo: Todo) => {
    const updatedTodoIndex = this.todos.findIndex(
      (todo) => todo.id === updatedTodo.id
    );
    if (updatedTodoIndex < 0) {
      throw new TodoListError({
        name: "UPDATING_NON_EXISTENT_TODO",
        message: "Not possible to update a non-existent todo.",
        cause: undefined,
      });
    }
    this.todos[updatedTodoIndex] = updatedTodo;
  };

  delete = (id: string) => {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new TodoListError({
        name: "UPDATING_NON_EXISTENT_TODO",
        message: "Not possible to delete a non-existent todo.",
        cause: undefined,
      });
    }
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };
}
