export class Todo {
  public description: string;
  public isFinished: boolean;
  public id: string;

  constructor(description: string, id: string) {
    this.description = description;
    this.id = id;
    this.isFinished = false;
  }

  finish = () => {
    this.isFinished = true;
  };
}
