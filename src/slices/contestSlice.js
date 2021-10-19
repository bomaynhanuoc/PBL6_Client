import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchError, fetchStart, fetchSuccess } from "./common";
import { getContests } from "../apis/contest";

const initialState = {
  contests: [],
};

export const getAllContest = createAsyncThunk(
  "contest/get-all",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchStart());
      const response = await getContests();

      if (response.data) {
        // console.log(response.data);
        dispatch(fetchSuccess());
        return response.data;
      }
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  }
);

const contestSlice = createSlice({
  name: "contest",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllContest.fulfilled, (state, action) => {
      state.contests = action.payload;
    });
  },
});

export default contestSlice.reducer;
