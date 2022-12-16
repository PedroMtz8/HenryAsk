import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk("user/info");

const initialState = {
  currentPosts: [],
  currentPage: 1,
  maxPages:1
};

export const paginatedSlice = createSlice({
  name: "paginated",
  initialState,
  reducers: {
    savePosts: (state, action) => {
      state.currentPosts = action.payload.foundPosts
      state.maxPages = action.payload.maxPages
    },
    incrementPage: (state) => {
      state.currentPage += 1
    },
    decrementPage: (state) => {
      state.currentPage -= 1
    },
    
  },
  extraReducers: (builder) => { },
});

export const { savePosts, incrementPage, decrementPage } = paginatedSlice.actions

export default paginatedSlice.reducer;