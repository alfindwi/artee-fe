import type { IUser } from "../../types/user";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginAsync, registerAsync } from "./async";

export interface AuthState {
  token: string;
  user?: IUser | null;
  loading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") || "",
  isLoggedIn: !!Cookies.get("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      Cookies.set("token", action.payload.token, { expires: 7 });
    },
    logout: (state) => {
      state.token = "";
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          "Login failed. Please check your email and password.";
      });

    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
