import { Status } from "../../Status";
import { TodoDTO } from "../../TodoDTO";

type ParseTodoToStringParams = TodoDTO & {
  isFinished: boolean;
  id: string;
};

export class ParseTodoToString {
  private static parseIsFinished(isFinished: boolean) {
    return isFinished ? "Yes" : "No";
  }

  private static parseStatus(status?: Status) {
    switch (status) {
      case Status.TODO:
        return "Todo";
      case Status.DOING:
        return "Doing";
      case Status.DONE:
        return "Done";
      default:
        return "Unknown";
    }
  }

  static parse(params: ParseTodoToStringParams) {
    return `- id: ${params.id}\n- Description: ${
      params.description
    }\n- Finished? ${this.parseIsFinished(
      params.isFinished
    )}\n- Status: ${this.parseStatus(params.status)}`;
  }
}
