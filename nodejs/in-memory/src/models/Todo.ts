import { v4 as uuid } from "uuid";

export class Todo {
  private readonly _id: string;
  private _isFinished: boolean;

  constructor(private _description: string) {
    this._isFinished = false;
    this._id = uuid();
  }

  get id() {
    return this._id;
  }

  get isFinished() {
    return this._isFinished;
  }

  set isFinished(isFinished: boolean) {
    this._isFinished = isFinished;
  }

  get description() {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  toString() {
    const isFinished = this._isFinished ? "Yes" : "No";
    return `id: ${this._id} - ${this._description} - Finished? ${isFinished}`;
  }
}
