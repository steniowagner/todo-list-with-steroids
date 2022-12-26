import { TodoList } from "./TodoList";
import { Todo } from "./Todo";

const todoList = new TodoList();

const todo = new Todo("My first todo");

todoList.add(todo);

todoList.readAll();

todoList.delete(todo.id);

todoList.readAll();
