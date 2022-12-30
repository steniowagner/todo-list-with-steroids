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

  get value(): string {
    const isFinished = this.isFinished ? "Yes" : "No";
    return `id: ${this.id} - ${this.description} - Finished? ${isFinished}`;
  }

  finish = () => {
    this.isFinished = true;
  };
}
