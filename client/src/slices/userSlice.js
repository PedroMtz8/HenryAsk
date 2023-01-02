import { filter } from "@chakra-ui/react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/environment";

const initialState = {
  user: {},
  users: [],
  page: 1,
  userQuestions: [],
  userAnswers: [],
  requests: [],
  reqMaxPages: 0,
  usersMaxPages: 0,
  maxPages: 0,
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

export const getRequest = createAsyncThunk(
  "get/request",
  async ({ token, page }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/request?page=${page}`,
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

export const getByMail = createAsyncThunk(
  "get/mail",
  async ({ token, page, mail }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/auth/users?mail=${mail}&page=${page}`,
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
    nextPage: (state) => {
      state.page += 1;
    },
    previousPage: (state) => {
      state.page -= 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    filterByRol: (state, action) => {
      let filtered = [];
      let allUsers = state.users;

      switch (action.payload) {
        case "Estudiante":
          filtered = allUsers.filter((user) => user.rol === "Estudiante");
          break;

        case "Graduado":
          filtered = allUsers.filter((user) => user.rol === "Graduado");
          break;

        case "TA":
          filtered = allUsers.filter((user) => user.rol === "TA");
          break;

        case "Henry Hero":
          filtered = allUsers.filter((user) => user.rol === "Henry Hero");
          break;

        default:
          filtered = allUsers;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.foundUsers;
        state.usersMaxPages = action.payload.maxPages;
      })
      .addCase(getRequest.fulfilled, (state, action) => {
        state.requests = action.payload.requests;
        state.reqMaxPages = action.payload.maxPages;
      })
      .addCase(getByMail.fulfilled, (state, action) => {
        state.users = action.payload.foundUsers;
        state.usersMaxPages = action.payload.maxPages;
      });
  },
});

export const {
  saveUser,
  saveQuestions,
  nextPage,
  previousPage,
  setPage,
  filterByRol,
} = userSlice.actions;

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
