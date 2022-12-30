export const EXIT_OPTION = "7";

export class TodoMenuView {
  static main = () => `1 -- Create todo
2 -- Read all todos
3 -- Read one todo (by id)
4 -- Update a todo description
5 -- Mark a todo as "completed"
6 -- Remove a todo
${EXIT_OPTION} -- Exit
`;

  static create = () => `[Create Todo]\n\nWhat would you like to do?\n\n`;

  static readById = () => `[Reading Todo by id]\n\nWhat's the Todo id?\n`;

  static update = () => `[Update a Todo description]\n\nWhat's the Todo id?\n`;

  static updateDescription = () => `\nType the new description\n`;

  static delete = () => `[Remove a Todo]\n\nWhat's the Todo id?\n`;
}
