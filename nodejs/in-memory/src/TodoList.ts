import { Todo } from "./Todo";

export class TodoList {
  private todos: Todo[];

  constructor() {
    this.todos = [];
  }

  add = (todo: Todo) => {
    this.todos.push(todo);
  };
}
