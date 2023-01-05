import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk("user/info");

const initialState = {
  currentPosts: [],
  currentPage: 1,
  maxPages:1,
  order: "newest",
  titleFilter: "",
  tagsFilter: "",
  moduleFilter: "",
  loading: false
};

export const paginatedSlice = createSlice({
  name: "paginated",
  initialState,
  reducers: {
    savePosts: (state, action) => {
      state.currentPosts = action.payload.foundPosts
      state.maxPages = action.payload.maxPages
      state.loading = false
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
    addFilterByTags: (state, action) => {
      state.tagsFilter = action.payload
    },
    changeTitleFilter: (state, action) => {
      state.titleFilter = action.payload
    },
    postLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => { },
});

export const { savePosts, 
  incrementPage, 
  decrementPage, 
  changePage, 
  changeModuleFilter, 
  changeOrder,
  addFilterByTags,
  changeTitleFilter,
  postLoading
} = paginatedSlice.actions

export default paginatedSlice.reducer;