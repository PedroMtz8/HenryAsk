import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import paginatedSlice from "../slices/paginatedSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    paginated: paginatedSlice,
  },
});

export default store;
