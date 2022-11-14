import { TodoStatus } from '../../../types/todoApi';

export interface CommonComponentProps {
  onChangeStatus: (id: string, currentStatus: TodoStatus) => void,
  onDelete: (id: string) => void,
}