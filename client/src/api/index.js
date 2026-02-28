import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);
export const google = (formData) => API.post("/auth/google", formData);
export const signOut = () => API.post("/auth/signout");

export const getUser = () => API.get("/user");

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get("/posts", { params: { page } });
export const fetchPostsByCreator = (name) =>
  API.get("/posts/creator", { params: { name } });
export const fetchPostsBySearch = ({ search, tags }) =>
  API.get("/posts/search", {
    params: {
      searchQuery: search || "none",
      tags,
    },
  });
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
