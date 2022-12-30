import { TodoMenuController } from "./TodoMenuController";

export class MenuController {
  private todoMenuController: TodoMenuController;

  constructor() {
    this.todoMenuController = new TodoMenuController();
  }

  public start = async () => {
    this.todoMenuController.display();
  };
}
