
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authApi from "@/services/authApi";

// API call handled asynchronously
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authApi.login(credentials);

      // Adjust these fields to match your actual backend response DTO.
      const token = data.accessToken || data.token;

      if (!token) {
        return rejectWithValue(
          "Login response does not contain an access token."
        );
      }

      return {
        token,
        user: data.user || data.userResponseDTO || null,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials."
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        state.token = token;
        state.isAuthenticated = Boolean(token);

        try {
          state.user = savedUser ? JSON.parse(savedUser) : null;
        } catch {
          state.user = null;
          localStorage.removeItem("user");
        }

        if (!token) {
          state.user = null;
          localStorage.removeItem("user");
        }
      }

      state.loading = false;
    },

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user } = action.payload;

        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);

          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
          } else {
            localStorage.removeItem("user");
          }
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong during login.";
      });
  },
});

export const {
  initializeAuth,
  logoutUser,
  clearAuthError,
} = AuthSlice.actions;

export default AuthSlice.reducer;
