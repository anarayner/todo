import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, setPage } from '../store/todoSlice';
import { RootState, AppDispatch } from '../store/store';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Container, Button, Stack } from '@mui/material';
import Pagination from './Pagination';
import ErrorMessage from './ErrorMessage';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error, currentPage } = useSelector((state: RootState) => state.todo);

  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchTodos(currentPage));
  }, [dispatch, currentPage]);

//filter for completed and pending tasks
  const handleFilter = () => {
    setShowCompleted(!showCompleted);
  };

  const filteredTodos = todos.filter(todo => showCompleted ? todo.completed : !todo.completed);

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Todo List
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button variant="contained" onClick={handleFilter}>
              {showCompleted ? 'Show Pending' : 'Show Completed'}
            </Button>
          </Stack>

          <Table sx={{ mt: 4 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTodos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.completed ? 'Completed' : 'Pending'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      <Pagination currentPage={currentPage} setPage={(page: number) => dispatch(setPage(page))} />
    </Container>
  );
};

export default TodoList;
