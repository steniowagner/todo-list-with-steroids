const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class ReadlineWrapper {
  private readValue = (query: string) =>
    new Promise((resolve) => readline.question(query, resolve));

  public read = async (text: string) => this.readValue(text);
}
