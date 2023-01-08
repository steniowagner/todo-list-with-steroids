import { TodoQueryHandler } from "./TodoQueryHandler";
import { Status } from "../Status";
import { TodoData } from "../TodoData";

export class TodoQueries extends TodoQueryHandler {
  constructor(todo: TodoData) {
    super(todo);
  }

  getId(): string {
    return this.todo.id;
  }

  getStatus(): Status {
    return this.todo.status;
  }

  getDescription(): string {
    return this.todo.description.value;
  }

  getIsFinished(): boolean {
    return this.todo.isFinished;
  }
}
