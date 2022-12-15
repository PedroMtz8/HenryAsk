import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk("user/info");

const initialState = {
  currentPosts: [],
  currentPage: 1,
  maxPages: 1
};

export const paginatedSlice = createSlice({
  name: "paginated",
  initialState,
  reducers: {
    savePosts: (state, action) => {
      state.currentPosts = action.payload.foundPosts
      state.currentPage = 1
      state.maxPages = action.payload.maxPages
    },
    changePage: (state, action) => {
      state.currentPage = action.payload.foundPosts
    }
  },
  extraReducers: (builder) => { },
});

export const { savePosts, changePage } = paginatedSlice.actions

export default paginatedSlice.reducer;