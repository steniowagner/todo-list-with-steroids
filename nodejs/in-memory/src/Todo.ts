export class Todo {
  private description: string;
  private isFinished: boolean;
  private id: string;

  constructor(description: string, id: string) {
    this.description = description;
    this.id = id;
    this.isFinished = false;
  }

  finish = () => {
    this.isFinished = true;
  };
}
