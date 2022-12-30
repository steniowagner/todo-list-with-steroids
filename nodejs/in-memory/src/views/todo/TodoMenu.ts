export const EXIT_OPTION = "6";

export class TodoMenuView {
  static main = () => `
1 -- Create todo
2 -- Read all todos
3 -- Read one todo (by id)
4 -- Edit a todo
4 -- Mark a todo as "completed"
5 -- Remove a todo
${EXIT_OPTION} -- Exit
`;

  static create = () => `What would you like to do?\n`;
}
