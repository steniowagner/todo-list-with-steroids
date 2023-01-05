import { ErrorBase } from "../../utils/errors/ErrorBase";

type Errors = "INVALID_FLAG";

export class FlagErrors extends ErrorBase<Errors> {}
