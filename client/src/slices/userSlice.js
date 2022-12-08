import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk("user/info");

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
