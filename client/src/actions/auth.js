import * as api from "../api/index.js";
import { addUser, removeUser } from "../reducers/features/userReducer.js";
import { AppError } from "../utils/AppError.js";

export const signIn = (formData, navigate, setSnackBar) => async (dispatch) => {
  try {
    const response = await api.signIn(formData);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(addUser(response.data.data));

    navigate("/");
  } catch (error) {
    setSnackBar(error.message);
    navigate("/auth");
  }
};

export const signUp = (formData, navigate, setSnackBar) => async (dispatch) => {
  try {
    const response = await api.signUp(formData);
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(addUser(response.data.data));

    navigate("/");
  } catch (error) {
    setSnackBar(error.message);
    navigate("/auth");
  }
};

export const google = (formData, navigate, setSnackBar) => async (dispatch) => {
  try {
    const response = await api.google(formData);

    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(addUser(response.data.data));

    navigate("/");
  } catch (error) {
    setSnackBar(error.message);
    navigate("/auth");
  }
};

export const signOut = (setSnackBar) => async (dispatch) => {
  try {
    const response = await api.signOut();
    if (!response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(removeUser());
  } catch (error) {
    setSnackBar(error.message);
  }
};
