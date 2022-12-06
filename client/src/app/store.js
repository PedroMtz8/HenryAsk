import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
  },
});

export default store;
