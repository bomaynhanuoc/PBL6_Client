import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteAccount, getAccounts, updateAccount } from "../apis/account";

const initialState = {
  accounts: [],
  loading: false,
  message: "",
  error: "",
};

export const getAllAccount = createAsyncThunk(
  "account/get-all",
  async (body, { rejectWithValue }) => {
    try {
      const response = await getAccounts(body);

      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAccountWithName = createAsyncThunk(
  "account/delete",
  async (body, { rejectWithValue }) => {
    try {
      const response = await deleteAccount(body);

      if (response.data.includes("Successfully")) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAccountByField = createAsyncThunk(
  "account/update",
  async (body, { rejectWithValue }) => {
    try {
      const response = await updateAccount(body);

      // console.log(response);
      if (response.data.includes("Successfully")) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.accounts = action.payload;
    });
    builder.addCase(getAllAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteAccountWithName.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(deleteAccountWithName.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { resetError, resetMessage } = accountSlice.actions;

export default accountSlice.reducer;
