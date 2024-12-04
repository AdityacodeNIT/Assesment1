import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [], // Array to store tasks
};

const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.dueDate = dueDate;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const existingTask = state.tasks.find(
        (task) => task.id === action.payload
      );
      if (existingTask) {
        existingTask.completed = !existingTask.completed;
      }
    },
    markTaskCompleted: (state, action) => {
      const existingTask = state.tasks.find(
        (task) => task.id === action.payload
      );
      if (existingTask) {
        existingTask.completed = true;
      }
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleComplete,
  markTaskCompleted,
} = TasksSlice.actions;

export default TasksSlice.reducer;
