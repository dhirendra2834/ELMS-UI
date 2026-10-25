
import { createSlice} from "@reduxjs/toolkit";
import {loginUser, registerUser, forgetPassword, verifyOtp, resetPassword, changePassword} from '@/redux/Actions/AuthAction';

const initialState = {
   // Authentication
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Forgot password, OTP, reset and change password
  authActionLoading: false,
  authActionError: null,
  authActionMessage: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    
    // Restore authentication after page refresh
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        state.token = token;
        state.isAuthenticated = Boolean(token);

        try {
          state.user = token && savedUser
            ? JSON.parse(savedUser)
            : null;
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

    // Logout User
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

    // Clear errors
    clearAuthError: (state) => {
      state.error = null;
    },

  clearAuthActionStatus: (state) => {
  state.authActionError = null;
  state.authActionMessage = null;
},
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;

        // Registration does not necessarily log the user in.
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message;
      })

      // LOGIN
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
            localStorage.setItem(
              "user",
              JSON.stringify(user)
            );
          } else {
            localStorage.removeItem("user");
          }
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message;
      })

      // forget password
      .addCase(forgetPassword.pending, (state) => {
         state.authActionLoading = true;
        state.authActionError = null;
         state.authActionMessage = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
         state.authActionLoading = false;
       state.authActionMessage =
       action.payload?.message || "OTP sent successfully";
    })
    .addCase(forgetPassword.rejected, (state, action) => {
       state.authActionLoading = false;
     state.authActionError = action.payload || "Failed to send OTP";
     })

    //  verify- otp
      .addCase(verifyOtp.pending, (state) => {
         state.authActionLoading = true;
        state.authActionError = null;
         state.authActionMessage = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
         state.authActionLoading = false;
       state.authActionMessage =
       action.payload?.message || "OTP sent successfully";
    })
    .addCase(verifyOtp.rejected, (state, action) => {
       state.authActionLoading = false;
     state.authActionError = action.payload || "Failed to send OTP";
     })
   
    //  reset password
    .addCase(resetPassword.pending, (state) => {
         state.authActionLoading = true;
        state.authActionError = null;
         state.authActionMessage = null;
      })
    .addCase(resetPassword.fulfilled, (state, action) => {
         state.authActionLoading = false;
       state.authActionMessage =
       action.payload?.message || "OTP sent successfully";
    })
    .addCase(resetPassword.rejected, (state, action) => {
       state.authActionLoading = false;
     state.authActionError = action.payload || "Failed to send OTP";
     })

    //  change password
    .addCase(changePassword.pending, (state) => {
         state.authActionLoading = true;
        state.authActionError = null;
         state.authActionMessage = null;
      })
    .addCase(changePassword.fulfilled, (state, action) => {
         state.authActionLoading = false;
       state.authActionMessage =
       action.payload?.message || "OTP sent successfully";
    })
    .addCase(changePassword.rejected, (state, action) => {
       state.authActionLoading = false;
     state.authActionError = action.payload || "Failed to send OTP";
     })

      },
    });

export const {
  initializeAuth,
  logoutUser,
  clearAuthError, clearAuthActionStatus,
} = AuthSlice.actions;

export default AuthSlice.reducer;
