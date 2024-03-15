import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  project: {},
  projects: [],
  resources: [],
  resource: {},
};

export const getProject = createAsyncThunk(
  "/directory/projects/get/:id",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/directory/${payload.id}`,
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
  "/directory/projects/get",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/directory",
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

export const getFile = createAsyncThunk(
  "/directory/file/get",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/resources/${payload.fileId}?projectId=${payload.id}`,
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

const directory = createSlice({
  name: "directory",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProject.fulfilled, (state, { payload }) => {
      state.project = payload.project;
      state.resources = payload.resources;
      state.isLoading = false;
    });
    builder.addCase(getProject.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, { payload }) => {
      state.projects = payload.projects;
      state.isLoading = false;
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getFile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFile.fulfilled, (state, { payload }) => {
      state.resource = payload.resource;
      state.isLoading = false;
    });
    builder.addCase(getFile.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default directory.reducer;
