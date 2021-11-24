import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchError, fetchStart, fetchSuccess } from "./common";
import { addParticipant, getContest, getContests } from "../apis/contest";
import { isObject } from "../utils/";

const initialState = {
  contests: [],
  contestDetail: {},
  loading: false,
  message: "",
  error: "",
};

export const getAllContest = createAsyncThunk(
  "contest/get-all",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchStart());
      const response = await getContests();

      console.log(response);
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

export const getContestDetail = createAsyncThunk(
  "contest/get-detail",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getContest(params);
      // console.log(response.data);
      if (isObject(response.data)) {
        return response.data;
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.message);
      // return error.message;
    }
  }
);

export const signUpContest = createAsyncThunk(
  "contest/sign-up",
  async (params, { rejectWithValue }) => {
    try {
      const response = await addParticipant(params);
      console.log(response.data);
      if (response.data.indexOf("Successfully") !== -1) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.message);
    }
  }
);

const contestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllContest.fulfilled, (state, action) => {
      state.contests = action.payload;
    });
    builder.addCase(getContestDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getContestDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.contestDetail = action.payload;
    });
    builder.addCase(getContestDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(signUpContest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpContest.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(signUpContest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetError } = contestSlice.actions;

export default contestSlice.reducer;
