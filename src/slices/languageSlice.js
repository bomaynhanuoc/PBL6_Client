import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createLanguage,
  deleteLanguage,
  getLanguages,
  updateLanguage,
} from "../apis/language";

const initialState = {
  languages: [],
  loading: false,
  message: "",
  error: "",
};

export const getAllLanguages = createAsyncThunk(
  "language/get-all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLanguages();

      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addLanguage = createAsyncThunk(
  "language/create",
  async (body, { rejectWithValue }) => {
    try {
      const response = await createLanguage(body);

      if (response.data.includes("Successfully")) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.message);
    }
  }
);

export const updateLanguageByField = createAsyncThunk(
  "language/update",
  async (body, { rejectWithValue }) => {
    try {
      const response = await updateLanguage(body);

      if (response.data.includes("Successfully")) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.message);
    }
  }
);

export const removeLanguage = createAsyncThunk(
  "language/delete",
  async (body, { rejectWithValue }) => {
    try {
      const response = await deleteLanguage(body);

      if (response.data.includes("Successfully")) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.message);
    }
  }
);

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    resetInfo: (state) => {
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllLanguages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllLanguages.fulfilled, (state, action) => {
      state.loading = false;
      state.languages = action.payload;
    });
    builder.addCase(getAllLanguages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addLanguage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addLanguage.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(addLanguage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateLanguageByField.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateLanguageByField.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(updateLanguageByField.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeLanguage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeLanguage.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(removeLanguage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetInfo } = languageSlice.actions;
export default languageSlice.reducer;
