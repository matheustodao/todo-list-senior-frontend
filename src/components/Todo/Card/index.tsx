import { Badge, Button, Flex, Heading, IconButton, Stack } from '@chakra-ui/react';
import { FaCheck, FaTrash } from 'react-icons/fa';

import { TodoParams } from '../../../types/todoApi';
import { CommonComponentProps } from '../types';

interface TodoCardProps extends TodoParams, CommonComponentProps { }

export default function TodoCard({ id, name, status, created_at, onChangeStatus, onDelete }: TodoCardProps) {
  return (
    <Stack
      boxShadow="md"
      border="2.5px solid"
      borderColor="blackAlpha.100"
      h="min-content"
      padding="4"
      borderRadius="xl"
      flexDirection="row"
      alignItems="center"
      justify="space-between"
      transition="all 0.25s ease"
      _hover={{
        border: '2.5px solid',
        borderColor: 'blue.400'
      }}
    >
      <Flex gap="24px" alignItems="center">
        <Flex alignItems="center" gap="18px">
        <Button
          variant="outline"
          size="md"
          onClick={() => onChangeStatus(id, status)}
          borderWidth="2.5px"
          w="48px"
          h="48px"
          p={0}
        >
          {status === 'done' ? <FaCheck /> : undefined}
        </Button>

          <Heading as="h2" fontSize={24}>
            {name}
          </Heading>
        </Flex>

        <Flex>
          <Badge bg="facebook.400" px="8px" borderRadius="2xl" color="white">
            {new Date(created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
          </Badge>
        </Flex>
    </Flex>

      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        color="red.300"
        icon={<FaTrash />}
        onClick={() => onDelete(id)}
        aria-label={`Deletar tarefa ${name}`}
      />
    </Stack>
  )
}
