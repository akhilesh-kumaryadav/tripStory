import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  posts: [],
  currentPage: 1,
  numberOfPages: 1,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    fetchAll: (state, action) => {
      state.posts = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
    },
    fetchBySearch: (state, action) => {
      state.posts = action.payload;
    },
    fetchByCreater: (state, action) => {
      state.posts = action.payload;
    },
    fetchPost: (state, action) => {
      state.posts.push(action.payload);
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post,
      );
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    likePostSuccess: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post,
      );
    },
    commentPostSuccess: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post,
      );
    },
  },
});

export const {
  startLoading,
  endLoading,
  fetchAll,
  fetchBySearch,
  fetchByCreater,
  fetchPost,
  addPost,
  updatePost,
  removePost,
  likePostSuccess,
  commentPostSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;
