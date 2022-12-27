import { TodoListModel } from "../models/todo-list/TodoListModel";
import { TodoListError } from "../models/todo-list/TodoList.errors";
import { Todo } from "../models/Todo";

export class TodoListController {
  private todoList: TodoListModel;

  constructor() {
    this.todoList = new TodoListModel();
  }

  checkTodoAlreadyExists = (targetTodo: Todo) =>
    this.todoList
      .readAll()
      .find((todo) => todo.description === targetTodo.description);

  create = (newTodo: Todo) => {
    const isTodoAlredayExists = this.checkTodoAlreadyExists(newTodo);
    if (isTodoAlredayExists) {
      throw new TodoListError({
        name: "TODO_ALREADY_EXISTS",
        message:
          "This todo already exist. Please choose another title for this new todo.",
        cause: undefined,
      });
    }
    this.todoList.add(newTodo);
  };

  readAll = () => this.todoList.readAll();

  readById = (id: string) => this.todoList.readById(id);

  update = (todo: Todo) => {
    const isTodoAlredayExists = this.checkTodoAlreadyExists(todo);
    if (!isTodoAlredayExists) {
      throw new TodoListError({
        name: "UPDATING_NON_EXISTENT_TODO",
        message: "Not possible to update a non-existent todo.",
        cause: undefined,
      });
    }
    this.todoList.update(todo);
  };

  delete = (id: string) => {
    const isTodoExists = this.readById(id);
    if (!isTodoExists) {
      throw new TodoListError({
        name: "UPDATING_NON_EXISTENT_TODO",
        message: "Not possible to delete a non-existent todo.",
        cause: undefined,
      });
    }
    this.todoList.delete(id);
  };
}
