import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";

// const userStorage = JSON.parse(localStorage.getItem("user"));
// const tokenStorage = JSON.parse(localStorage.getItem("token"));

const userStorage = (() => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
})();

const tokenStorage = (() => {
  try {
    return JSON.parse(localStorage.getItem("token"));
  } catch {
    return null;
  }
})();

// Initial state
const initialState = {
  user: userStorage ? userStorage : null,
  token: tokenStorage ? tokenStorage : null,
  error: null,
  status: "idle",
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
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

// Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    return await authService.logout();
  } catch (error) {
    console.error(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  reset: (state) => {
    state.status = "idle";
    state.error = null;
  },
  extraReducers: (builder) => {
    builder
      // REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Registration failed";
      })

      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Login failed";
        state.user = null;
        state.token = null;
        // ensure no stale creds hang around
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })

      // LOGOUT USER
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
        state.error = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Logout failed";
      });
  },
});

export default authSlice.reducer;
