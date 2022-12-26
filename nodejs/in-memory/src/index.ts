import { TodoList } from "./TodoList";
import { Todo } from "./Todo";

const todoList = new TodoList();

const todo = new Todo("My first todo", "123");

todoList.add(todo);

console.log(todoList.readById(todo.id));

todo.finish();

todoList.update(todo);

console.log(todoList.readById(todo.id));
