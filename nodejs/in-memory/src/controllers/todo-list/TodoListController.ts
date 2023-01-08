import { TodoListModel } from "../../models/todo-list/TodoListModel";
import { TodoListError } from "../../models/todo-list/TodoList.errors";
import { Todo } from "../../models/todo/Todo";

type UpdateTodoParams = {
  id: string;
  isFinished?: boolean;
  description?: string;
};
export class TodoListController {
  private todoList: TodoListModel;

  constructor() {
    this.todoList = new TodoListModel();
  }

  checkTodoAlreadyExists = (description: string) =>
    this.todoList.readAll().find((todo) => todo.description === description);

  create = (description: string) => {
    const todo = Todo.create(description);
    const isTodoAlredayExists = this.checkTodoAlreadyExists(todo.description);
    if (isTodoAlredayExists) {
      throw new TodoListError({
        name: "TODO_ALREADY_EXISTS",
        message:
          "This todo already exist. Please choose another title for this new todo.",
        cause: undefined,
      });
    }
    this.todoList.add(todo);
    return todo;
  };

  readAll = () => this.todoList.readAll();

  readById = (id: string) => this.todoList.readById(id);

  private readExistentTodoById = (id: string) => {
    const todo = this.todoList.readById(id);
    if (!todo) {
      throw new TodoListError({
        name: "UPDATING_NON_EXISTENT_TODO",
        message: "Not possible to update a non-existent todo.",
        cause: undefined,
      });
    }
    return todo;
  };

  private checkUpdatingToExistentDescription = (description: string) => {
    const isTodoAlredayExists = this.checkTodoAlreadyExists(description);
    if (isTodoAlredayExists) {
      throw new TodoListError({
        name: "TODO_DESCRIPTION_ALREADY_EXISTS",
        message: `This todo is alredy created.`,
        cause: undefined,
      });
    }
  };

  update = (params: UpdateTodoParams) => {
    const todo = this.readExistentTodoById(params.id);
    if (params.description) {
      this.checkUpdatingToExistentDescription(params.description);
    }
    if (params.isFinished) {
      todo.finish();
    }
    todo.description = params.description || todo.description;
    return this.todoList.update(todo);
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
