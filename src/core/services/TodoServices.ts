import { TodoNewParams } from '../../types/todoApi/index';
import HttpClient from '../infra/HttpClient';
import { TodoParams, TodoStatus } from '../../types/todoApi';
import { todoApi } from './../infra/apis/todo/index';
import { UseCaseTodo } from '../useCases/todo';

interface IOptionsMethodService {
  cb: (data: any) => void,
}

class TodoServices {
  readonly httpClient: HttpClient;
  private usecase: UseCaseTodo = new UseCaseTodo();

  constructor(readonly todos: TodoParams[] = []) {
    this.usecase.todos = todos

    this.httpClient = todoApi;
    this.httpClient.prefixPath = '/todos'
  }

  async getAll(options?: IOptionsMethodService): Promise<TodoParams[]> {
    let todos = this.usecase.index();

    todos = await this._memoryData<TodoParams[], Promise<TodoParams[]>>(todos, this.httpClient.get());
    this.usecase.todos = todos;

    this._callbackTodoData(options?.cb)

    return todos;
  }

  async create(data: TodoNewParams): Promise<TodoParams> {
    const todo = this.usecase.store(data);

    return await this.httpClient.post({
      options: {
        data: todo,
      }
    })
  }

  async changeStatus(id: string, status: TodoStatus, options?: IOptionsMethodService): Promise<TodoParams> {
    let todo = this.usecase.updateStatus(id, status);

    todo = await this._memoryData<TodoParams[], Promise<TodoParams[]>>(todo, this.httpClient.patch({
      path: `/${id}`,
      options: {
        data: {
          status: todo?.status ?? status,
        }
      }
    }));

    this._callbackTodoData(options?.cb)

    return todo;
  }

  async delete(id: string, options?: IOptionsMethodService): Promise<any> {
    let deleted = this.usecase.deleteTodo(id);

    deleted = await this._memoryData(deleted, this.httpClient.delete({
      path: `/${id}`
    }))

    this._callbackTodoData(options?.cb)

    return deleted;
  }

  async _memoryData<CurrentTodoType = any, newTodoType = any>(
    currentTodos: CurrentTodoType | any,
    newTodo: newTodoType,
  ) {
    if (!currentTodos || !currentTodos?.length) {
      return newTodo;
    }

    return currentTodos
  }

  _callbackTodoData(callback?: IOptionsMethodService['cb']) {
  if (callback) {
    callback(this.usecase.todos)
  }
  }
}

export const todoServices = new TodoServices();
