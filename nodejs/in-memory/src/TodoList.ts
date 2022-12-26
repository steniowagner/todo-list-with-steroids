import { Todo } from "./Todo";

export class TodoList {
  private todos: Todo[];

  constructor() {
    this.todos = [];
  }

  add = (todo: Todo) => {
    this.todos.push(todo);
  };

  readAll = () => {
    this.todos.map((todo, index) =>
      console.log(
        `${index + 1} - Description: ${todo.description} - Finished: ${
          todo.isFinished ? "Yes" : "No"
        }`
      )
    );
  };

  readById = (id: string) => this.todos.find((todo) => todo.id === id);

  update = (updatedTodo: Todo) => {
    const updatedTodoIndex = this.todos.findIndex(
      (todo) => todo.id === updatedTodo.id
    );
    if (!updatedTodoIndex) {
      return;
    }
    this.todos[updatedTodoIndex] = updatedTodo;
  };

  delete = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };
}
