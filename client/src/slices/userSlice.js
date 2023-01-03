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
  filteredUsers: [],
}

export const getUser = createAsyncThunk("get/user", async (token) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/auth`, {
      headers: { Authorization: "Bearer " + token },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

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
  async ({ token, page, type }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/request?page=${page}&type=${type}`,
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

export const getUserByRol = createAsyncThunk(
  "get/rol",
  async ({ page, rol, token }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/auth/users?page=${page}&rol=${rol}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(data);
      return data;
    } catch (error) {}
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
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getUserByRol.fulfilled, (state, action) => {
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
  saveAnswers,
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
    dispatch(saveQuestions(questions.data));
  } catch (error) {
    console.log(error);
  }
};

export const getUserAnswers = (token, userID, page) => async (dispatch) => {
  try {
    let answers = await axios(
      `${API_URL}/answer/user?page=${page}&user_id=${userID}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    dispatch(saveAnswers(answers.data))
  } catch (error) {
    console.log(error);
  }
};
