/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import axios from "../../config/axiosconfig";
import { loaduser, loaduserbooks } from "../features/userSlice";

export const asyncaddtofavourite = (id) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');

    const res = await axios.post(`/users/favorite`, { bookId: id }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

export const asyncloaduser = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');

    const { data } = await axios.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(loaduser(data.user));
  } catch (error) {
    // Handle error if needed
    console.log(error.message);
  }
}

export const asyncloaduserbooks = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');
    const { data } = await axios.get('/books/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

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