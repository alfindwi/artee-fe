import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import Cookies from "js-cookie";

export const getTasksAsync = createAsyncThunk(
  "tasks/get",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/tasks");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch movies.");
    }
  }
);

export const createTaskAsync = createAsyncThunk(
  "tasks/create",
  async (title: string, thunkAPI) => {
    try {
      const res = await api.post("/tasks", title, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create task.");
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/update",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        return rejectWithValue("Unauthorized: Anda belum login.");
      }

      const { data } = await api.put(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Gagal memperbarui tugas";
      return rejectWithValue(message);
    }
  }
);

export const deleteAsnyc = createAsyncThunk(
  "tasks/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        return rejectWithValue("Unauthorized: Anda belum login.");
      }
      
      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
