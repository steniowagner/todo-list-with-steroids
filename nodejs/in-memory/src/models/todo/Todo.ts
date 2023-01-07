import { v4 as uuid } from "uuid";

import { ParseTodoToString } from "./utils/parse-todo-to-string/ParseTodoToString";
import { Description } from "./description/Description";
import { Priority } from "./Priority";
import { TodoDTO } from "./TodoDTO";
import { Status } from "./Status";
import { Flag } from "../flag/Flag";
import { ChecklistItem } from "./checklist-item/ChecklistItem";

export class Todo {
  private _checklistItems: ChecklistItem[];
  private readonly _id: string;
  private _isFinished: boolean;
  private _flag?: Flag;
  private startedAt?: number;

  private constructor(
    private _description: Description,
    private _priority: Priority,
    private _status: Status
  ) {
    this._isFinished = false;
    this._id = uuid();
    this._checklistItems = [];
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
    return !!this._flag;
  }

  get flag() {
    return this._flag?.value;
  }

  get checklistItems() {
    return this._checklistItems;
  }

  private handleSetStartedDate(status: Status) {
    if (status === Status.DOING) {
      this.startedAt = Date.now();
    }
  }

  public addChecklistItems(checklistItemsDescriptions: string[]) {
    const newChecklistItems = checklistItemsDescriptions.map(
      (checklistItemsDescription) =>
        ChecklistItem.create(checklistItemsDescription)
    );
    this._checklistItems = [...newChecklistItems, ...this._checklistItems];
  }

  public finish() {
    this._isFinished = true;
  }

  public unfinish() {
    this._isFinished = false;
  }

  public addFlag(reason: string) {
    this._flag = Flag.create(reason);
  }

  public removeFlag() {
    this._flag = undefined;
  }

  public toString() {
    return ParseTodoToString.parse({
      isFinished: this.isFinished,
      id: this.id,
      description: this.description,
      priority: this.priority,
      status: this.status,
      flag: this._flag?.value,
      startedAt: this.startedAt,
    });
  }

  static create(todo: TodoDTO) {
    const priority = todo.priority || Priority.LOW;
    const status = todo.status || Status.TODO;
    return new Todo(Description.create(todo.description), priority, status);
  }
}
