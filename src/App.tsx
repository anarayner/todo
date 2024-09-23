import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TodoList from './components/TodoList';
import { Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <TodoList />
      </Container>
    </Provider>
  );
};

export default App;
