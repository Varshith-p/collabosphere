import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice";
import projectReducer from "./redux/project/projectSlice";
import directoryReducer from "./redux/directory/directorySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    directory: directoryReducer,
  },
});

export default store;
