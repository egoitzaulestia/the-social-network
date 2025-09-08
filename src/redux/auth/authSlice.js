import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    console.log("from store", userData);

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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
