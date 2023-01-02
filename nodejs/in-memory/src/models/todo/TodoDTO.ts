import { Priority } from "./Priority";
import { Status } from "./Status";

export interface TodoDTO {
  description: string;
  priority?: Priority;
  status?: Status;
}
