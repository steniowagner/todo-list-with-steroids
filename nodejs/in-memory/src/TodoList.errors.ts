import { ErrorBase } from "./utils/errors/ErrorBase";

type ErrorNames = "TODO_ALREADY_EXISTS";

export class TodoListError extends ErrorBase<ErrorNames> {}
