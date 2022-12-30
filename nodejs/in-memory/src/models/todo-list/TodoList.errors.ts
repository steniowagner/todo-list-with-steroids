import { ErrorBase } from "../../utils/errors/ErrorBase";

type ErrorNames =
  | "TODO_ALREADY_EXISTS"
  | "UPDATING_NON_EXISTENT_TODO"
  | "TODO_DESCRIPTION_ALREADY_EXISTS"
  | "DELETING_NON_EXISTENT_TODO";

export class TodoListError extends ErrorBase<ErrorNames> {}
