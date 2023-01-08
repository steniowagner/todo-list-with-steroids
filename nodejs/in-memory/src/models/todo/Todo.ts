import { v4 as uuid } from "uuid";

import { ParseTodoToString } from "./utils/parse-todo-to-string/ParseTodoToString";
import { Description } from "./description/Description";
import { TodoDTO } from "./TodoDTO";
import { Status } from "./Status";

export class Todo {
  private readonly _id: string;
  private _isFinished: boolean;
  private startedAt?: number;

  private constructor(
    private _description: Description,
    private _status: Status
  ) {
    this._isFinished = false;
    this._id = uuid();
  }

  get id() {
    return this._id;
  }

  get status() {
    return this._status;
  }

  set status(status: Status) {
    this.handleSetStartedDate(status);
    this._status = status;
  }

  get description() {
    return this._description.value;
  }

  set description(description: string) {
    this._description.value = description;
  }

  get isFinished() {
    return this._isFinished;
  }

  private handleSetStartedDate(status: Status) {
    if (status === Status.DOING) {
      this.startedAt = Date.now();
    }
  }

  public finish() {
    this._isFinished = true;
  }

  public unfinish() {
    this._isFinished = false;
  }

  public toString() {
    return ParseTodoToString.parse({
      isFinished: this.isFinished,
      id: this.id,
      description: this.description,
      status: this.status,
    });
  }

  static create(todo: TodoDTO) {
    const status = todo.status || Status.TODO;
    return new Todo(Description.create(todo.description), status);
  }
}
