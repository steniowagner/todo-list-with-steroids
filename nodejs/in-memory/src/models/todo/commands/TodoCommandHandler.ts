import { TodoData } from "../TodoData";
import { Status } from "../Status";

export abstract class TodoCommandHandler {
  constructor(protected todo: TodoData) {}

  abstract setDescription(description: string): void;
  abstract start(): void;
  abstract finish(): void;
}
