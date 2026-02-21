import * as api from "../api";
import {
  addPost,
  commentPostSuccess,
  endLoading,
  fetchAll,
  fetchByCreater,
  fetchBySearch,
  fetchPost,
  likePostSuccess,
  removePost,
  startLoading,
  updatePost,
} from "../reducers/features/postsReducer";
import { AppError } from "../utils/AppError";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await api.fetchPost(id);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(fetchPost(response.data.data));
  } catch (error) {
    console.error(error.message);
  } finally {
    dispatch(endLoading());
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await api.fetchPosts(page);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(
      fetchAll({
        data: response.data.data,
        currentPage: response.data.currentPage,
        numberOfPages: response.data.numberOfPages,
      }),
    );
  } catch (error) {
    console.error(error.message);
  } finally {
    dispatch(endLoading());
  }
};

export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await api.fetchPostsByCreator(name);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(fetchByCreater(response.data.data));
  } catch (error) {
    console.error(error.message);
  } finally {
    dispatch(endLoading());
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await api.fetchPostsBySearch(searchQuery);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(fetchBySearch(response.data.data));
  } catch (error) {
    console.error(error.message);
  } finally {
    dispatch(endLoading());
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch(startLoading);
    const response = await api.createPost(post);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(addPost(response.data.data));

    navigate(`/posts/${response.data.data._id}`);
  } catch (error) {
    console.error(error.message);
  } finally {
    dispatch(endLoading);
  }
};

export const editPost = (id, post) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await api.updatePost(id, post);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(updatePost(response.data.data));
  } catch (error) {
    console.error(error.message);
  } finally {
    dispatch(endLoading());
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await api.likePost(id);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(likePostSuccess(response.data.data));
  } catch (error) {
    console.error(error.message);
  } finally {
    dispatch(endLoading());
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await api.comment(value, id);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(commentPostSuccess(response.data.data));
  } catch (error) {
    console.error(error.message);
  } finally {
    dispatch(endLoading());
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await api.deletePost(id);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(removePost(id));
  } catch (error) {
    console.error(error.message);
  } finally {
    dispatch(endLoading());
  }
};
