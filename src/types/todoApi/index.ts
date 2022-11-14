export type TodoStatus = 'pending' | 'done'

export interface TodoParams {
  id: string,
  name: string,
  status: TodoStatus,
  created_at: Date | string,
}

export type TodoNewParams = Omit<TodoParams, 'id' | 'created_at' | 'status'> & {
  status?: TodoStatus,
}

export interface TodoUpgradeParams {
  status: TodoStatus,
}
