import { TodoListMenuController } from "./TodoListMenuController";

export class MenuController {
  private todoListMenuController: TodoListMenuController;

  constructor() {
    this.todoListMenuController = new TodoListMenuController();
  }

  public start = async () => {
    this.todoListMenuController.display();
  };
}
