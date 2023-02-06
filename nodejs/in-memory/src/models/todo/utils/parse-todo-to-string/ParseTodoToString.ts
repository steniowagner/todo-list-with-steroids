import { DateTime } from "luxon";

import { TodoData } from "../../TodoData";
import { Status } from "../../Status";

export class ParseTodoToString {
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

  private static parseDate(isoDate: string): string {
    const date = DateTime.fromISO(isoDate);
    return `${date.monthLong} ${date.day}, ${date.year} at ${date.hour}:${date.minute}:${date.second}`;
  }

  static parse(params: TodoData) {
    return `- id: ${params.id}\n- Description: ${
      params.description
    }\n- Status: ${this.parseStatus(
      params.status
    )}\n- Created at: ${this.parseDate(params.createdAt)}\n- Started at: ${
      params.startedAt ? this.parseDate(params.createdAt) : "-"
    }`;
  }
}
