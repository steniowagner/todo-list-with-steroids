import { TodoData } from "../TodoData";
import { Status } from "../Status";
import { Description } from "../description/Description";
import { TodoCommandHandler } from "./TodoCommandHandler";

export class TodoCommands extends TodoCommandHandler {
  constructor(todo: TodoData) {
    super(todo);
  }

  finish(): void {
    this.todo.isFinished = true;
  }

  unfinish(): void {
    this.todo.isFinished = false;
  }

  setStatus(status: Status): void {
    this.todo.status = status;
  }

  setDescription(description: string): void {
    this.todo.description = Description.create(description);
  }
}
