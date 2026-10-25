
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  allUsersData,
  userDetailsByUserId,
  selfAccountDetails,
} from "@/services/apidetails";

// Common error handler
const getErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong"
  );
};

// 1. Get all users (Admin)
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allUsersData();
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 2. Get user details by ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userDetailsByUserId(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 3. Get the logged-in user's account details
export const fetchMyAccount = createAsyncThunk(
  "user/fetchMyAccount",
  async (id, { rejectWithValue }) => {
    try {
      const response = await selfAccountDetails(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  allUsers: [],
  selectedUser: null,
  accountDetails: null,

  allUsersLoading: false,
  selectedUserLoading: false,
  accountLoading: false,

  allUsersError: null,
  selectedUserError: null,
  accountError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearSelectedUser(state) {
      state.selectedUser = null;
      state.selectedUserError = null;
    },

    clearUserErrors(state) {
      state.allUsersError = null;
      state.selectedUserError = null;
      state.accountError = null;
    },

    clearUserState() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder

      // All users
      .addCase(fetchAllUsers.pending, (state) => {
        state.allUsersLoading = true;
        state.allUsersError = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsersLoading = false;

        // Adjust if your backend returns a wrapper object.
        const data = action.payload;
        state.allUsers = Array.isArray(data)
          ? data
          : data?.users ?? data?.data ?? [];
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.allUsersLoading = false;
        state.allUsersError = action.payload || "Failed to fetch users";
      })

      // User by ID
      .addCase(fetchUserById.pending, (state) => {
        state.selectedUserLoading = true;
        state.selectedUserError = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUserError =
          action.payload || "Failed to fetch user details";
      })

      // My account
      .addCase(fetchMyAccount.pending, (state) => {
        state.accountLoading = true;
        state.accountError = null;
      })
      .addCase(fetchMyAccount.fulfilled, (state, action) => {
        state.accountLoading = false;
        state.accountDetails = action.payload;
      })
      .addCase(fetchMyAccount.rejected, (state, action) => {
        state.accountLoading = false;
        state.accountError =
          action.payload || "Failed to fetch account details";
      });
  },
});

export const {
  clearSelectedUser,
  clearUserErrors,
  clearUserState,
} = userSlice.actions;

export default userSlice.reducer;
