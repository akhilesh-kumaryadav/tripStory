import {
  addUser,
  endLoading,
  startLoading,
} from "../reducers/features/userReducer";
import * as api from "../api";
import { AppError } from "../utils/AppError";

export const getUser = async (dispatch, navigate) => {
  try {
    dispatch(startLoading());

    const response = await api.getUser();
    if (response.data.result) {
      throw new AppError(response.data.status, response.data.message);
    }

    dispatch(addUser(response.data.data));
  } catch (error) {
    navigate("/posts");
  } finally {
    dispatch(endLoading());
  }
};
