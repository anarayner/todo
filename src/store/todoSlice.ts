import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Todo } from '../types/Todo';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  currentPage: 1,
};

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch todos');
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setPage } = todoSlice.actions;
export default todoSlice.reducer;
