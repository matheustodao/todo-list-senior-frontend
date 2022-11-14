import { TodoNewParams, TodoParams, TodoStatus } from '../../../types/todoApi/index';

export interface UseCaseTodoTypes {
  index(): TodoParams[],
  store(data: TodoNewParams): TodoParams,
  updateStatus(id: string, status: TodoStatus): TodoParams,
  deleteTodo(id: string): any,
}