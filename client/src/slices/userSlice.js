import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/environment";


const initialState = {
  user: {},
  page: 1,
  userQuestions: [],
  userAnswers: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload
    },
    saveQuestions: (state, action) => {
      state.userQuestions = action.payload
    }
  },
  extraReducers: (builder) => {},
});

export const { saveUser, saveQuestions } = userSlice.actions

export default userSlice.reducer;

// Son funciones que ejecutan las acciones, estas funciones traen la info y las setean en el estado

export const getUserData = (token) => async(dispatch) => {
  try {
    let userData = await axios(`${API_URL}/auth`, { headers: { Authorization: "Bearer " + token } })
     dispatch(saveUser(userData.data.user))
  } catch (error) {console.log(error, "hubo un error")}
}

export const getUserQuestions = (token, userID, page) => async(dispatch) => {
  try {
    let questions = await axios(`${API_URL}/posts/user?page=${page}&user_id=${userID}`, { headers: { Authorization: "Bearer " + token } })
     dispatch(saveQuestions(questions.data.foundPosts))
  } catch (error) {console.log(error)}
}
