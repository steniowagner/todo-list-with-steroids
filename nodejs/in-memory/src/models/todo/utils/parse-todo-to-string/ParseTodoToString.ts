import { Status } from "../../Status";
import { TodoData } from "../../TodoData";

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

  static parse(params: TodoData) {
    return `- id: ${params.id}\n- Description: ${
      params.description
    }\n- Finished? ${this.parseIsFinished(
      params.isFinished
    )}\n- Status: ${this.parseStatus(params.status)}`;
  }
}
