import { TodoData } from "../TodoData";
import { Status } from "../Status";

export abstract class TodoCommandHandler {
  constructor(protected todo: TodoData) {}

  abstract setDescription(description: string): void;
  abstract setStatus(status: Status): void;
  abstract finish(): void;
  abstract unfinish(): void;
}
