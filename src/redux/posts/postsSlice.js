import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postsService";

const initialState = {
  posts: [],
  post: null,
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

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id, thunkAPI) => {
    try {
      return await postService.getPostById(id);
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

export const getPostByTitle = createAsyncThunk(
  "posts/getPostByTitle",
  async (postTitle, thunkAPI) => {
    try {
      return await postService.getPostByTitle(postTitle);
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
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    clearPost: (state) => {
      state.post = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST ALL POSTS
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
      })

      // DETAIL / GET POST BY ID
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.post = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload ?? null;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.post = null;
      })

      // SEARCH POSTS BY TITLE
      .addCase(getPostByTitle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.posts = [];
      })
      .addCase(getPostByTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload ?? [];
      })
      .addCase(getPostByTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.posts = [];
      });
  },
});

export const { reset, clearPost } = postSlice.actions;
export default postSlice.reducer;
