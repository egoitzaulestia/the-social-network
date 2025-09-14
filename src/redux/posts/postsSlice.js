import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postsService";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllPostsInfo = createAsyncThunk(
  "posts/getAllPostsInfo",
  async (_, thunkAPI) => {
    try {
      // MUST return an array here (see service below)
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
  name: "posts",
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
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getAllPostsInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload ?? [];
      })
      .addCase(getAllPostsInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.posts = [];
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
