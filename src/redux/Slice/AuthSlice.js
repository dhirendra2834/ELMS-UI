import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { create } from "axios";
import {registerUser, loginUser} from '@/services/apidetails';

//  for register user 
export const registerUser= createAsyncThunk(
    "auth/register",
    async(requestData,{rejectwithvalue})=>{
        try{
         const response= await registerUser(requestData);
         return response.data;
        }catch(error){
           return rejectwithvalue(
            error.response?.data || "Failed to register the user"
           )
        }
    }
)

// for login user
export const loginUser=createAsyncThunk(
    "auth/login",
    async(requestData,{rejectwithvalue})=>{
        try{
            const response = await loginUser(requestData);
            return response.data;
        }catch(error){
            return rejectwithvalue(
                error.response?.data || "Failed to login the user"
            )
        }
    }
)

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const AuthSlice= createSlice({
    name:"AuthSlice",
    initialState,
     extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state)=>{
                state.loading=true;
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                state.loading=false;
                state.user= action.payload;
                state.isAuthenticated=true;
            })
            .addCase(registerUser.rejected, (state, action)=>{

            })
     }
})