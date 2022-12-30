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
    console.log(`${todo.value}\n`);
  };

  private handleReadAllTodos = () => {
    console.log("[All todos]\n");
    const allTodos = this.todoListController.readAll();
    allTodos.forEach((todo, index) =>
      console.log(`${index + 1} - ${todo.value}`)
    );
    console.log("");
  };

  private handleReadTodoById = async () => {
    const id = await this.reader.read(TodoMenuView.readById());
    const todo = this.todoListController.readById(id as string);
    if (!todo) {
      return console.log("\nTodo not found\n");
    }
    console.log(`\n${todo.value}\n`);
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
      default:
        return;
    }
  };
}
