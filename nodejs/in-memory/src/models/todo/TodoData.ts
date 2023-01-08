import { Description } from "./description/Description";
import { Status } from "./Status";

export interface TodoData {
  description: Description;
  id: string;
  isFinished: boolean;
  status: Status;
}
