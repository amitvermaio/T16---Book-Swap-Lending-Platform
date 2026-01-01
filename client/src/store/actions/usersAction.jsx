/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import axios from "../../config/axiosconfig";
import { loaduser, loaduserbooks } from "../features/userSlice";

export const asyncaddtofavourite = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.post(`/users/favorite`, { bookId: id });
  } catch (error) {
    console.log(error.message);
  }
}

export const asyncloaduser = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/auth/me`);

    dispatch(loaduser(data.user));
  } catch (error) {
    console.log(error.message);
  }
}

export const asyncloaduserbooks = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/books/me');

    if (data.books) {
      dispatch(loaduserbooks(data.books));
    } else {
      toast.error("Failed to load user books.");
    }
  } catch (error) {
    toast.error("An error occurred while loading user books.");
    console.log(error);
  }
}