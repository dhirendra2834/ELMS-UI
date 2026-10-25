import {
registerUserApi,loginUserApi,  forgetPasswordApi, verifyOtpApi, changePasswordApi, resetPasswordApi
} from "@/services/apidetails";

import {createAsyncThunk} from "@reduxjs/toolkit";
// Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to register the user"
      );
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(requestData);
      const data = response.data;
    console.log("login response => ", data);
      const token = data.jwttoken;

      if (!token) {
        return rejectWithValue(
          "Login response does not contain an access token."
        );
      }

      return {
        token,
        user: data|| null,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to login the user"
      );
    }
  }
);

// Forget password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await forgetPasswordApi(requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to send OTP to email"
      );
    }
  }
);

// verify Otp
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await verifyOtpApi(requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "OTP verification failed"
      );
    }
  }
);

// for Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await resetPasswordApi(requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to reset password"
      );
    }
  }
);

// for change the password 
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await changePasswordApi(requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to change password"
      );
    }
  }
);
