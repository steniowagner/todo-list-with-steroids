import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import { ParseTodoToString } from "./utils/parse-todo-to-string/ParseTodoToString";
import { Description } from "./description/Description";
import { TodoData } from "./TodoData";
import { Status } from "./Status";
import { TodoCommands } from "./commands/TodoCommands";
import { TodoQueries } from "./queries/TodoQueries";
import { TodoCommandHandler } from "./commands/TodoCommandHandler";
import { TodoQueryHandler } from "./queries/TodoQueryHandler";

interface TodoConstructorParams {
  description: Description;
  status: Status;
  now: DateTime;
}

interface TodoCreateParams {
  description: string;
  status?: Status;
  now: DateTime;
}

export class Todo {
  private readonly commands: TodoCommandHandler;
  private readonly queries: TodoQueryHandler;
  private data: TodoData;

  private constructor(params: TodoConstructorParams) {
    this.data = {
      description: params.description,
      id: uuid(),
      isFinished: false,
      status: params.status,
      createdAt: DateTime.now().toString(),
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

  get status() {
    return this.queries.getStatus();
  }

  get createdAt() {
    return this.queries.getCreatedAt();
  }

  get isFinished() {
    return this.queries.getIsFinished();
  }

  finish(): void {
    this.commands.finish();
  }

  unfinish(): void {
    this.commands.unfinish();
  }

  start(): void {
    this.commands.start();
  }

  toString(): string {
    return ParseTodoToString.parse(this.data);
  }

  static create(params: TodoCreateParams) {
    return new Todo({
      description: Description.create(params.description),
      status: params.status || Status.TODO,
      now: params.now,
    });
  }
}
