import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state) => {
      state.loading = false;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchError, fetchSuccess } = commonSlice.actions;
export default commonSlice.reducer;
