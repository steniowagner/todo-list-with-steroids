import { ErrorBase } from "../../../utils/errors/ErrorBase";

type Errors = "INVALID_DESCRIPTION";

export class DescriptionErrors extends ErrorBase<Errors> {}
