import { EntityTodo } from '../../entities/todo';
import { TodoParams, TodoNewParams, TodoStatus } from '../../../types/todoApi';
import { UseCaseTodoTypes } from './types';

export class UseCaseTodo extends EntityTodo implements UseCaseTodoTypes {
  constructor(todos: TodoParams[] = []) {
    super(todos)
  }

  index(): TodoParams[] {
    return this.todos;
  }

  store(data: TodoNewParams): TodoParams {
    return this.new(data.name, data.status);
  }

  updateStatus(id: string, status: TodoStatus): TodoParams {
    return this.update(id, { status })
  }

  deleteTodo(id: string): any {
    return this.deleteById(id);
  }
}