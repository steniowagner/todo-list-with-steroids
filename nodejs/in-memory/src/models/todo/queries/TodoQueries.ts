import { TodoQueryHandler } from "./TodoQueryHandler";
import { Status } from "../Status";
import { TodoData } from "../TodoData";

export class TodoQueries extends TodoQueryHandler {
  constructor(todo: TodoData) {
    super(todo);
  }

  getId(): string {
    return this._todo.id;
  }

  getStatus(): Status {
    return this._todo.status;
  }

  getDescription(): string {
    return this._todo.description.value;
  }

  getIsFinished(): boolean {
    return this._todo.isFinished;
  }
}
