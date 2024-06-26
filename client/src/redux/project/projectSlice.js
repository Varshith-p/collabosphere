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
  resources: [],
  resource: {},
  messages: [],
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

export const updateProject = createAsyncThunk(
  "/user/project/update",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/projects/${payload._id}`,
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

export const updateTaskStatus = createAsyncThunk(
  "/user/task/update-status",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/tasks/${payload._id}`,
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

export const deleteTask = createAsyncThunk(
  "/user/task/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/tasks/${payload.id}`,
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

export const uploadFile = createAsyncThunk(
  "/user/file/upload",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/resources/?projectId=${payload.id}`,
        payload.formData,
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
  "/user/file/get",
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

export const deleteFile = createAsyncThunk(
  "/user/file/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
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

export const sendMessage = createAsyncThunk(
  "/user/message/send",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/messages",
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
      state.users = payload.users;
      state.isLoading = false;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProject.fulfilled, (state, { payload }) => {
      state.project = payload.project;
      state.resources = payload.resources;
      state.messages = payload.messages;
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

    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProject.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProject.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(updateProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProject.fulfilled, (state, { payload }) => {
      state.project = payload.project;
      state.isLoading = false;
    });
    builder.addCase(updateProject.rejected, (state) => {
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

export default product.reducer;
