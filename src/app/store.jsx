import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/TasksSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
