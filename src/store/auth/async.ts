import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "../../types/user";
import Cookies from "js-cookie";
import { api } from "../../libs/api";

export const loginAsync = createAsyncThunk<
  { token: string; user: IUser },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", data);
    const { token, user } = res.data;

    Cookies.set("token", token, { expires: 7 });
    return { token, user };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Login failed. Please check your email and password.";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const registerAsync = createAsyncThunk<void, any>(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (error: any) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
