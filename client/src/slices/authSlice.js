import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuth: false,
  message: "",
};

export const register = createAsyncThunk("user/register", async () => {
  try {
    const { data } = await axios.post("http://localhost:3001/auth/register");
    console.log(data.message);
    return data.message;
  } catch (error) {
    return error;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isAuth = false;
      state.message = action.payload.message;
    });
  },
});

export default authSlice.reducer;
