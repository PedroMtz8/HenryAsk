import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk("user/info");

/* export const getPosts = createAsyncThunk("posts/getPostsPage",
  async (currentPage) => {
    const res = await axios.get(API_URL + `/posts?page=${currentPage}`, { headers: { Authorization: "Bearer " + token } })
    return response.data
  }
); */

const initialState = {
  currentPosts: [],
  currentPage: 1,
  maxPages:1,
  order: "newest",
  tagsFilter: "",
  moduleFilter: ""
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
    changePage: (state, action) => {
      state.currentPage = parseInt(action.payload)
    },
    changeModuleFilter: (state, action) => {
      state.moduleFilter = action.payload
    },
    changeOrder: (state, action) => {
      state.order = action.payload
    },    
  },
  extraReducers: (builder) => { },
});

export const { savePosts, incrementPage, decrementPage, changePage, changeModuleFilter, changeOrder} = paginatedSlice.actions

export default paginatedSlice.reducer;