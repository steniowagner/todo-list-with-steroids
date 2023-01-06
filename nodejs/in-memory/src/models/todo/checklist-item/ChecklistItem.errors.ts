import { ErrorBase } from "../../../utils/errors/ErrorBase";

type Errors = "INVALID_CHECKLIST_ITEM_DESCRIPTION";

export class ChecklistItemErrors extends ErrorBase<Errors> {}
