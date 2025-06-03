import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  getTasksAsync,
  createTaskAsync,
  updateTaskAsync,
  deleteAsnyc,
} from "./async";
import type { ITask } from "../../types/task";

interface TasksState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getTasksAsync.fulfilled,
        (state, action: PayloadAction<ITask[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        }
      )
      .addCase(getTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createTaskAsync.fulfilled,
        (state, action: PayloadAction<ITask>) => {
          state.loading = false;
          state.tasks.push(action.payload);
        }
      )
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateTaskAsync.fulfilled,
        (state, action: PayloadAction<ITask | undefined>) => {
          state.loading = false;
          const updatedTask = action.payload;
          if (updatedTask) {
            const index = state.tasks.findIndex(
              (task) => task.id === updatedTask.id
            );
            if (index !== -1) {
              state.tasks[index] = updatedTask;
            }
          }
        }
      )
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        alert(state.error);
      });

    builder
      .addCase(deleteAsnyc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAsnyc.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          const taskId = action.payload;
          state.tasks = state.tasks.filter((task) => task.id !== taskId);
        }
      )
      .addCase(deleteAsnyc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        alert(state.error);
      });
  },
});

export default tasksSlice.reducer;
