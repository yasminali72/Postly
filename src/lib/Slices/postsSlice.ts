import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";
//all posts
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (limit: number ) => {
    return await axios.get(
      `https://linked-posts.routemisr.com/posts?limit=${limit}&page=21`,{
      headers: {
        token:localStorage.getItem('token')
      }}
    );
  }
);


// single post
export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (postId: string) => {
    return await axios.get(
      `https://linked-posts.routemisr.com/posts/${postId}`,{
      headers: {
        token:localStorage.getItem('token')
      }}
    )
  }
);







const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    singlePost:null,
    isLoading: false,
    isError:false
    
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.fulfilled, (state, action: any) => {
      state.posts = action.payload.data.posts;
      state.isLoading = false;
    });
    builder.addCase(getPosts.pending, (state) => {
      state.posts = [];
      state.isLoading = true;
    });
    builder.addCase(getPosts.rejected, (state, action: any) => {
        state.posts = [];
        state.isLoading = false;

      });
      builder.addCase(getSinglePost.fulfilled, (state, action: any) => {
        state.singlePost = action.payload.data.post;
      });
      builder.addCase(getSinglePost.rejected, (state, action: any) => {
        state.singlePost=null
        state.isError=true
      });
     
  },
});

export const postsReducer = postsSlice.reducer;

