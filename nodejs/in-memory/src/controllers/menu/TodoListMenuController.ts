import { TodoMenuView, EXIT_OPTION } from "../../views/todo/TodoMenu";
import { TodoListController } from "../todo-list/TodoListController";
import { ReadlineWrapper } from "../../utils/ReadlineWrapper";

export class TodoListMenuController {
  private todoListController: TodoListController;
  private reader: ReadlineWrapper;

  constructor() {
    this.todoListController = new TodoListController();
    this.reader = new ReadlineWrapper();
  }

  public display = async () => {
    let option: unknown;
    console.clear();
    while (option !== EXIT_OPTION) {
      option = await this.reader.read(TodoMenuView.main());
      await this.handleMenuOption(option as string);
    }
    process.exit(0);
  };

  private handleCreateTodo = async () => {
    const description = await this.reader.read(TodoMenuView.create());
    const todo = this.todoListController.create(description as string);
    console.log("\nTodo created successfully\n");
    console.log(`${todo}\n`);
  };

  private handleReadAllTodos = () => {
    console.log("[All todos]\n");
    const allTodos = this.todoListController.readAll();
    allTodos.forEach((todo, index) => console.log(`${index + 1} - ${todo}`));
    console.log("");
  };

  private handleReadTodoById = async () => {
    const id = await this.reader.read(TodoMenuView.readById());
    const todo = this.todoListController.readById(id as string);
    if (!todo) {
      return console.log("\nTodo not found\n");
    }
    console.log(`\n${todo}\n`);
  };

  private handleUpdateTodoDescription = async () => {
    try {
      const id = await this.reader.read(TodoMenuView.update());
      const description = await this.reader.read(
        TodoMenuView.updateDescription()
      );
      this.todoListController.update({
        description: description as string,
        id: id as string,
      });
      console.log("\nTodo description updated successfully\n");
    } catch (err) {
      console.log("\nError when tried to update the todo description");
      console.log(`Reason: ${(err as Error).message}\n`);
    }
  };

  private handleMarkTodoAsCompleted = async () => {
    try {
      const id = await this.reader.read(TodoMenuView.update());
      this.todoListController.update({
        isFinished: true,
        id: id as string,
      });
      console.log("\nTodo successfully completed\n");
    } catch (err) {
      console.log("\nError when tried complete the Todo");
      console.log(`Reason: ${(err as Error).message}\n`);
    }
  };

  private handleDeleteTodo = async () => {
    try {
      const id = await this.reader.read(TodoMenuView.update());
      this.todoListController.delete(id as string);
      console.log("\nTodo successfully removed\n");
    } catch (err) {
      console.log("\nError when tried remove the Todo");
      console.log(`Reason: ${(err as Error).message}\n`);
    }
  };

  private handleMenuOption = async (option: string) => {
    console.clear();
    switch (option) {
      case "1":
        return this.handleCreateTodo();
      case "2":
        return this.handleReadAllTodos();
      case "3":
        return this.handleReadTodoById();
      case "4":
        return this.handleUpdateTodoDescription();
      case "5":
        return this.handleMarkTodoAsCompleted();
      case "6":
        return this.handleDeleteTodo();
      default:
        return;
    }
  };
}
