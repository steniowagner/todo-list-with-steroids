import { TodoData } from "../TodoData";
import { Status } from "../Status";
import { Description } from "../description/Description";
import { TodoCommandHandler } from "./TodoCommandHandler";

export class TodoCommands extends TodoCommandHandler {
  constructor(todo: TodoData) {
    super(todo);
  }

  finish(): void {
    this.todo.status = Status.DONE;
  }

  start(): void {
    this.todo.status = Status.DOING;
  }

  setDescription(description: string): void {
    this.todo.description = Description.create(description);
  }
}
