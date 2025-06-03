import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import taskReducer from "./tasks/slice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        auth : authReducer,
        task: taskReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store