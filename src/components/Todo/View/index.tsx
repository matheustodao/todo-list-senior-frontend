import { Box, Heading, Input } from '@chakra-ui/react';
import { useState, useEffect, ChangeEvent } from 'react'
import { todoServices } from '../../../core/services/TodoServices';
import { TodoParams, TodoStatus } from '../../../types/todoApi';
import TodoList from '../List';

export default function TodoView() {
  const [todos, setTodos] = useState<TodoParams[] | []>(todoServices.todos);
  const [taskName, setTaskName] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();

    await todoServices.create({ name: taskName })
    setTaskName('')
  }

  function handleChangeTaskName(e: ChangeEvent<HTMLInputElement>) {
    setTaskName(e.target.value);
  }

  async function handleChangeStatus(id: string, status: TodoStatus) {
    await todoServices.changeStatus(id, status === 'done' ? 'pending' : 'done',{
      cb: setTodos
    })
  }

  async function handleDeleteTodo(id: string) {
    await todoServices.delete(id, {
      cb: setTodos
    });
  }

  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await todoServices.getAll({
          cb: setTodos
        });
        setTodos(data)
      } catch {
        console.error('Got an error')
      }
    }

    loadTodos();
  }, [])

  return (
    <Box maxW="856px" mx="auto" w="100%">
      <Heading as="h1" size="4xl" mb="24">Todo</Heading>

      <TodoList
        todos={todos}
        onChangeStatus={handleChangeStatus}
        onDelete={handleDeleteTodo}
      />

      <Box as="form" my="32" onSubmit={handleSubmit}>
        <Input p="6" placeholder="Digite sua tarefa..." value={taskName} onChange={handleChangeTaskName} />
      </Box>
    </Box>
  )
}
