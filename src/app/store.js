import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import commonReducer from "../slices/common";
import AuthReducer from "../slices/authSlice";
import ContestReducer from "../slices/contestSlice";
import SubmitReducer from "../slices/submitSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    common: commonReducer,
    auth: AuthReducer,
    contest: ContestReducer,
    submit: SubmitReducer,
  },
});
