import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";

const userStorage = JSON.parse(localStorage.getItem("user"));
const tokenStorage = JSON.parse(localStorage.getItem("token"));

// Initial state
const initialState = {
  user: userStorage ? userStorage : null,
  token: tokenStorage ? tokenStorage : null,
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    console.log("from store", userData);

    try {
      return await authService.register(userData);
    } catch (error) {
      console.error(error);
    }

    console.error("from store", userData);
    //   async (userData, thunkAPI) => {
    //     try {
    //       const response = await fetch("http://localhost:4000/api/register", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(userData),
    //       });

    //       if (!response.ok) {
    //         const errorData = await response.json();
    //         return thunkAPI.rejectWithValue(errorData);
    //       }

    //       const data = await response.json();
    //       return data;
    //     } catch (error) {
    //       return thunkAPI.rejectWithValue({ error: error.message });
    //     }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      console.error(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
