import { TodoMenuView, EXIT_OPTION } from "../../views/todo/TodoMenu";
import { ReadlineWrapper } from "../../utils/ReadlineWrapper";

export class TodoMenuController {
  private reader: ReadlineWrapper;

  constructor() {
    this.reader = new ReadlineWrapper();
  }

  public display = async () => {
    let option: unknown;
    while (option !== EXIT_OPTION) {
      option = await this.reader.read(TodoMenuView.main());
      console.log("option: ", option);
    }
    process.exit(0);
  };
}
