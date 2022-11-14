import { v4 } from 'uuid';
import { TodoStatus, TodoParams, TodoUpgradeParams } from '../../../types/todoApi';

export abstract class EntityTodo {
  todos: TodoParams[];

  constructor(todos: TodoParams[] = []) {
    this.todos = todos;
  }

  protected new(name: string, status: TodoStatus = 'pending'): TodoParams {
    if (!name) {
      throw Error('Missing name field')
    }

    const todo: TodoParams = {
      id: v4(),
      name,
      status,
      created_at: new Date().toISOString(),
    }

    this.todos.push(todo);

    return todo;
  }

  protected find(id: string): TodoParams | undefined {
    const todo: TodoParams | undefined = this.todos.find((currentTodo) => currentTodo.id === id);

    return todo;
  }

  protected update(id: string, data?: TodoUpgradeParams) {
    const upgrade = this.todos.map((currentTodo) => currentTodo.id === id
      ? { ...currentTodo, ...data }
      : currentTodo
    );
    this.todos = upgrade;

    const todoExists = this.find(id);

    if (!todoExists) {
      throw Error('Not found todo')
    }

    return {...todoExists, ...data};
  }

  protected deleteById(id: string): any {
    this.todos = this.todos.filter((currentTodo) => currentTodo.id !== id);
    return this.todos;
  }
}