import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  title: string;
  userId: number;
  completed: boolean;
  id: number;
  text: string;
}

interface TodosState {
  todos: Todo[];
  selectedTodo: Todo | null;
  errorCase: boolean | null;
}

const initialState: TodosState = {
  todos: [],
  selectedTodo: null,
  errorCase: null,
};

export const todosReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    takeTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    selectTodos: (state, action: PayloadAction<Todo | null>) => {
      state.selectedTodo = action.payload;
    },
    getTodoErrors: (state, action: PayloadAction<boolean>) => {
      state.errorCase = action.payload;
    },
  },
});

export const { takeTodos, selectTodos, getTodoErrors } = todosReducer.actions;
export default todosReducer.reducer;
