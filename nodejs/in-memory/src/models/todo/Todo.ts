import { v4 as uuid } from "uuid";

import { Description } from "./description/Description";
import { Priority } from "./Priority";

export class Todo {
  private readonly _id: string;
  private _isFinished: boolean;

  private constructor(
    private _description: Description,
    private _priority: Priority
  ) {
    this._isFinished = false;
    this._id = uuid();
  }

  get id() {
    return this._id;
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

  public finish() {
    this._isFinished = true;
  }

  public unfinish() {
    this._isFinished = false;
  }

  public toString() {
    const isFinished = this._isFinished ? "Yes" : "No";
    return `id: ${this._id} - ${this._description.value} - Finished? ${isFinished} - Prior`;
  }

  static create(description: string, priority = Priority.LOW) {
    return new Todo(Description.create(description), priority);
  }
}
