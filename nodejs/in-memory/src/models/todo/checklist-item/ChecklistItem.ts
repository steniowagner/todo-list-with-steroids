import { ChecklistItemErrors } from "./ChecklistItem.errors";

export const MAX_CHARACTERS = 100;
export const MIN_CHARATERS = 1;

export class ChecklistItem {
  private _isFinished: boolean;

  private constructor(private _description: string) {
    this._isFinished = false;
  }

  get description() {
    return this._description;
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

  public updateDescription(description: string) {
    ChecklistItem.handleValidate(description);
    this._description = description;
  }

  private static handleValidate(description: string) {
    if (!ChecklistItem.validate(description)) {
      throw new ChecklistItemErrors({
        name: "INVALID_CHECKLIST_ITEM_DESCRIPTION",
        message: "Invalid description",
        cause: undefined,
      });
    }
  }

  static validate(description: string) {
    return (
      !!description &&
      description.trim().length >= MIN_CHARATERS &&
      description.trim().length <= MAX_CHARACTERS
    );
  }

  static create(description: string) {
    this.handleValidate(description);
    return new ChecklistItem(description);
  }
}
