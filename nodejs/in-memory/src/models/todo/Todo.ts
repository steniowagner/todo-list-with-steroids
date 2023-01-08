import { v4 as uuid } from "uuid";

import { ParseTodoToString } from "./utils/parse-todo-to-string/ParseTodoToString";
import { Description } from "./description/Description";
import { TodoData } from "./TodoData";
import { Status } from "./Status";
import { TodoCommands } from "./commands/TodoCommands";
import { TodoQueries } from "./queries/TodoQueries";
import { TodoCommandHandler } from "./commands/TodoCommandHandler";
import { TodoQueryHandler } from "./queries/TodoQueryHandler";

export class Todo {
  private readonly commands: TodoCommandHandler;
  private readonly queries: TodoQueryHandler;
  private data: TodoData;

  private constructor(description: Description, status: Status) {
    this.data = {
      description,
      id: uuid(),
      isFinished: false,
      status: status,
    };
    this.queries = new TodoQueries(this.data);
    this.commands = new TodoCommands(this.data);
  }

  get id() {
    return this.queries.getId();
  }

  get description() {
    return this.queries.getDescription();
  }

  set description(description: string) {
    this.commands.setDescription(description);
  }

  get isFinished() {
    return this.queries.getIsFinished();
  }

  get status() {
    return this.queries.getStatus();
  }

  set status(status: Status) {
    this.commands.setStatus(status);
  }

  finish() {
    this.commands.finish();
  }

  unfinish() {
    this.commands.unfinish();
  }

  toString() {
    return ParseTodoToString.parse(this.data);
  }

  static create(description: string, status: Status = Status.TODO) {
    return new Todo(Description.create(description), status);
  }
}
