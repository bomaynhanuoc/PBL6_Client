import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  message: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchError, fetchSuccess } = commonSlice.actions;
export default commonSlice.reducer;
