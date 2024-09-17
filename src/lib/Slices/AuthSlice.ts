import { User } from "./../../Interfaces/UserInterface";
import { LoginDataInterface } from "@/Interfaces/RegisterDataInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// login
export const login = createAsyncThunk(
  "Auth/login",
  async (values: LoginDataInterface) => {
    return await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      values
    );
  }
);

// logged

export const getUser = createAsyncThunk("Auth/getUser", async () => {
  return await axios.get(
    "https://linked-posts.routemisr.com/users/profile-data",
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
});
// get user posts
export const getUserPosts = createAsyncThunk(
  "Auth/getUserPosts",
  async (userId: string) => {
    return await axios.get(
      `https://linked-posts.routemisr.com/users/${userId}/posts?limit=50`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
);

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    token: "",
    isLoading: false,
    isErrore: false,
    isSuccess: false,
    error: "",
    dataUser: {
        _id: '',
    name: '',
    photo: '',
    createdAt: '', 
    dateOfBirth: '', 
    email: '',
    gender: '',
    },
    userPosts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: any) => {
      state.token = action.payload.data.token;
      state.isLoading = false;
      state.isErrore = false;
      state.isSuccess = true;
      (state.error = ""),
        localStorage.setItem("token", action.payload.data.token);
    });
    builder.addCase(login.pending, (state) => {
      state.token = localStorage.getItem("token") ?? "";
      state.isLoading = true;
      state.isErrore = false;
      state.isSuccess = false;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action: any) => {
      state.token = "";
      state.isLoading = false;
      state.isErrore = true;
      state.isSuccess = false;
      state.error = action.error.massage ?? "incorrect email or password";
    });
    builder.addCase(getUser.fulfilled, (state, action: any) => {
      state.dataUser = action.payload.data.user;
      state.isLoading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action: any) => {
      state.userPosts = action.payload.data.posts;
    });
  },
});

export const AuthReducer = AuthSlice.reducer;
