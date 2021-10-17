import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../apis/auth";
import { fetchError, fetchStart, fetchSuccess } from "./common";

export const registerAccount = createAsyncThunk(
  "user/register",
  async (params, { dispatch }) => {
    try {
      dispatch(fetchStart());
      const response = await register(params);

      if (response.data === "Added Successfully") {
        dispatch(fetchSuccess());
        return response.data;
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchError(error.message));
    }
  }
);

export const loginAccount = createAsyncThunk(
  "user/login",
  async (params, { dispatch }) => {
    try {
      dispatch(fetchStart());
      const response = await login(params);

      if (
        response.data.constructor === Object &&
        Object.keys(response.data).length > 0
      ) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(fetchSuccess("Login successfully."));
        return response.data;
      } else {
        console.log(response.data);
        dispatch(fetchError(response.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchError(error.message));
      return error.message;
    }
  }
);

export const logoutAccount = createAsyncThunk(
  "user/logout",
  async (params, { dispatch }) => {
    try {
      dispatch(fetchStart());
      const response = await logout(params);
      localStorage.removeItem("user");
      // console.log(response);
      dispatch(fetchSuccess(response.data));
      return {};
    } catch (error) {
      console.log(error);
      dispatch(fetchError(error.message));
    }
  }
);

const initialState = {
  data: JSON.parse(localStorage.getItem("user")) || {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(logoutAccount.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default userSlice.reducer;
