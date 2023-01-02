import { Todo } from "../todo/Todo";

export class TodoListModel {
  public todos: Todo[];

  constructor() {
    this.todos = [];
  }

  add = (todo: Todo) => this.todos.push(todo);

  readAll = () => this.todos;

  readById = (id: string) => this.todos.find((todo) => todo.id === id);

  update = (updatedTodo: Todo) => {
    const updatedTodoIndex = this.todos.findIndex(
      (todo) => todo.id === updatedTodo.id
    );
    this.todos[updatedTodoIndex] = updatedTodo;
  };

  delete = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };
}
