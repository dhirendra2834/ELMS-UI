
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { coursesData, courseDataById } from "@/services/apidetails";

// ALL course displayed 
export const allcoursesData = createAsyncThunk(
  "courses/allcoursesData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coursesData();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch courses"
      );
    }
  }
);
//  fetch course data by CourseId
export const coursesDataById = createAsyncThunk(
  "course/id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await courseDataById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch courses"
      );
    }
  }
);

const initialState = {
  coursesData: [],
  courseData: null,
  loading: true,
  error: null,
};

const CourseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
//   method of all course data
      .addCase(allcoursesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(allcoursesData.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesData = action.payload;
      })
      .addCase(allcoursesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

    //   method of fetch course data by Id
    builder
       .addCase(coursesDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(coursesDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.courseData = action.payload;
      })
      .addCase(coursesDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
  },
});

export default CourseSlice.reducer;

