import { Status } from "../Status";
import { TodoData } from "../TodoData";

export abstract class TodoQueryHandler {
  protected readonly _todo: TodoData;

  constructor(todo: TodoData) {
    this._todo = todo;
  }

  abstract getId(): string;
  abstract getStatus(): Status;
  abstract getDescription(): string;
  abstract getIsFinished(): boolean;
}
