import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
};

export const login = createAsyncThunk(
  "/user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        payload
      );
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const register = createAsyncThunk(
  "/user/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        payload
      );
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const uploadPicture = createAsyncThunk(
  "/user/image/upload",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/users`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const removePicture = createAsyncThunk(
  "/user/image/remove",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(uploadPicture.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      localStorage.setItem("user", JSON.stringify(payload.user));
    });

    builder.addCase(removePicture.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      localStorage.setItem("user", JSON.stringify(payload.user));
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
