import { Description } from "./description/Description";
import { Status } from "./Status";

export interface TodoData {
  description: Description;
  id: string;
  status: Status;
  createdAt: string;
  startedAt?: string;
}
