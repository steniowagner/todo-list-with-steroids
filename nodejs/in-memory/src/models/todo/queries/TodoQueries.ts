import { DateTime } from "luxon";

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

  getCreatedAt(): string {
    return this.todo.createdAt;
  }

  getStartedAt(): string {
    if (!this.todo.startedAt) {
      return "-";
    }
    return this.todo.startedAt;
  }
}
