import { v4 as uuid } from "uuid";

import { Description } from "./description/Description";
import { Priority } from "./Priority";
import { TodoDTO } from "./TodoDTO";
import { Status } from "./Status";
import { ParseTodoToString } from "./utils/parse-todo-to-string/ParseTodoToString";

export class Todo {
  private readonly _id: string;
  private _isFinished: boolean;
  private _isFlagged: boolean;

  private constructor(
    private _description: Description,
    private _priority: Priority,
    private _status: Status
  ) {
    this._isFinished = false;
    this._isFlagged = false;
    this._id = uuid();
  }

  get id() {
    return this._id;
  }

  get status() {
    return this._status;
  }

  set status(status: Status) {
    this._status = status;
  }

  get description() {
    return this._description.value;
  }

  set description(description: string) {
    this._description.value = description;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority: Priority) {
    this._priority = priority;
  }

  get isFinished() {
    return this._isFinished;
  }

  get isFlagged() {
    return this._isFlagged;
  }

  public finish() {
    this._isFinished = true;
  }

  public unfinish() {
    this._isFinished = false;
  }

  public flag() {
    this._isFlagged = true;
  }

  public unflag() {
    this._isFlagged = false;
  }

  public toString() {
    return ParseTodoToString.parse({
      isFinished: this.isFinished,
      id: this.id,
      description: this.description,
      priority: this.priority,
      status: this.status,
    });
  }

  static create(todo: TodoDTO) {
    const priority = todo.priority || Priority.LOW;
    const status = todo.status || Status.TODO;
    return new Todo(Description.create(todo.description), priority, status);
  }
}
