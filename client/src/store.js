import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice";
import projectReducer from "./redux/project/projectSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
  },
});

export default store;
