import { Flex, Heading } from '@chakra-ui/react'
import { TodoParams } from '../../../types/todoApi'
import TodoCard from '../Card'
import { CommonComponentProps } from '../types'

interface TodoListProps extends CommonComponentProps {
  todos: TodoParams[],
}

export default function TodoList({ todos, onChangeStatus, onDelete }: TodoListProps) {
  return (
    <Flex
      gap="24px"
      direction="column"
      maxH="500px"
      overflowY="auto"
      pr="3"
      py="3"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'orange',
          borderRadius: '24px',
        },
      }}
    >
      {todos.length > 0 && todos.map((currentTodo) => (
        <TodoCard
          key={currentTodo.id}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
          {...currentTodo}
        />
      ))}

      {!todos.length && (
        <Heading as="h2" fontSize="24px">
          Não tem nenhuma tarefa registrada ainda
        </Heading>
      )}
    </Flex>
  )
}
