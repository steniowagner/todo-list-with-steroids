import { v4 as uuid } from "uuid";

import { Description } from "./description/Description";

export class Todo {
  private readonly _id: string;
  private _isFinished: boolean;

  private constructor(private _description: Description) {
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
    return `id: ${this._id} - ${this._description} - Finished? ${isFinished}`;
  }

  static create(description: string) {
    return new Todo(Description.create(description));
  }
}
