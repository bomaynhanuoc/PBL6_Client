import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubmits } from "../apis/contest";

const initialState = {
  submits: [],
  loading: false,
  message: "",
  error: "",
};

export const getAllSubmit = createAsyncThunk(
  "submit/get-all",
  async (body, { rejectWithValue }) => {
    try {
      const response = await getSubmits(body);

      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const submitSlice = createSlice({
  name: "submit",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSubmit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllSubmit.fulfilled, (state, action) => {
      state.loading = false;
      state.submits = action.payload;
    });
    builder.addCase(getAllSubmit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetError } = submitSlice.actions;

export default submitSlice.reducer;
