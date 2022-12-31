import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/environment";

const initialState = {
  user: {},
  page: 1,
  userQuestions: [],
  userAnswers: [],
  requests: [],
  reqMaxPages: 1,
  usersMaxPages: 0,
};

export const getUsers = createAsyncThunk(
  "get/users",
  async ({ token, page }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/auth/users?page=${page}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    saveQuestions: (state, action) => {
      state.userQuestions = action.payload;
    },
    saveAnswers: (state, action) => {
      state.userAnswers = action.payload;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    previousPage: (state) => {
      state.page -= 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.foundUsers;
      state.usersMaxPages = action.payload.maxPages;
    });
  },
});


export const { saveUser, saveQuestions, saveAnswers, nextPage, previousPage, setPage } =
  userSlice.actions;

export default userSlice.reducer;



// Son funciones que ejecutan las acciones, estas funciones traen la info y las setean en el estado

export const getUserData = (token) => async (dispatch) => {
  try {
    let userData = await axios(`${API_URL}/auth`, {
      headers: { Authorization: "Bearer " + token },
    });
    dispatch(saveUser(userData.data.user));
  } catch (error) {
    console.log(error, "hubo un error");
  }
};

export const getUserQuestions = (token, userID, page) => async (dispatch) => {
  try {
    let questions = await axios(
      `${API_URL}/posts/user?page=${page}&user_id=${userID}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    dispatch(saveQuestions(questions.data.foundPosts));
  } catch (error) {
    console.log(error);
  }
};

export const getUserAnswers = (token, userID, page) => async (dispatch) => {
  try {
    let answers = await axios(`${API_URL}/answer/user?page=${page}&user_id=${userID}`, { headers: { Authorization: "Bearer " + token }})
    dispatch(saveAnswers(answers.data.foundAnswers))
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = (token, avatar, country, userSlack) => async () =>  {
  try {
      if(!userSlack){
         await axios.put(`${API_URL}/auth`, {avatar, country}, { headers: { Authorization: "Bearer " + token }})
      }
      await axios.put(`${API_URL}/auth`, {userSlack, country}, { headers: { Authorization: "Bearer " + token }})

  } catch (error) {
    console.log(error)
  }
}