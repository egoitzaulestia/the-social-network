import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./auth/authSlice";
import auth from "./auth/authSlice";
import posts from "./post/postsSlice";

export const store = configureStore({
  reducer: { auth, posts },
});
