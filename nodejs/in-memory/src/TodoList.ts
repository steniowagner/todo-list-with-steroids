import { Todo } from "./Todo";

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
      return;
    }
    this.todos.push(newTodo);
  };

  readAll = () => this.todos;

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
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return undefined;
    }
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };
}
