import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all posts info
export const getAllPostsInfo = createAsyncThunk(
  "posts/getAllPostsInfo",
  async (_, thunkAPI) => {
    try {
      return await postService.getAllPostsInfo();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostsInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPostsInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPostsInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = [];
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
