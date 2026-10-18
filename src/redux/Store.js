
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slice/AuthSlice';
import courseReducer from './Slice/CourseSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
  }
});
