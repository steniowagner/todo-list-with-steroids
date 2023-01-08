import { Status } from "../Status";
import { TodoData } from "../TodoData";

export abstract class TodoQueryHandler {
  protected readonly todo: TodoData;

  constructor(todo: TodoData) {
    this.todo = todo;
  }

  abstract getId(): string;
  abstract getStatus(): Status;
  abstract getDescription(): string;
  abstract getIsFinished(): boolean;
  abstract getCreatedAt(): string;
}
