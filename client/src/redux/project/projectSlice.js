import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  users: [],
  project: {},
  projects: [],
};

export const getUsers = createAsyncThunk(
  "/user/users/get",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getProject = createAsyncThunk(
  "/user/projects/get/:id",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/projects/${payload.id}`,
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

export const getProjects = createAsyncThunk(
  "/user/projects/get",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/projects",
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

export const createProject = createAsyncThunk(
  "/user/project/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/projects",
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

export const createTask = createAsyncThunk(
  "/user/task/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/tasks",
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

const product = createSlice({
  name: "project",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.users = payload.users;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProject.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.project = payload.project;
    });
    builder.addCase(getProject.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.projects = payload.projects;
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProject.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProject.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default product.reducer;
