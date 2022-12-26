import { v4 as uuid } from "uuid";

export class Todo {
  public description: string;
  public isFinished: boolean;
  public id: string;

  constructor(description: string) {
    this.description = description;
    this.isFinished = false;
    this.id = uuid();
  }

  finish = () => {
    this.isFinished = true;
  };
}
