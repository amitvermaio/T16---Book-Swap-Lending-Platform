/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import axios from "../../config/axiosconfig";
import { loaduser, loaduserbooks, removebookfavorite, setbookfavorite } from "../features/userSlice";

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

export const asyncupdateprofile = (userPayload) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch(`/users/update-details`, userPayload);
    dispatch(loaduser(data.user));
    toast.success("Profile updated successfully.");
  } catch (error) {
    toast.error(error.response?.data?.message ?? "Failed to update profile.");
  }
}

export const asyncupdateavatar = (formData) => async (dispatch, getState) => {
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(`/users/update-avatar`, formData, config);
    dispatch(loaduser(data.user));
    toast.success("Avatar updated successfully.");
  } catch (error) {
    toast.error(error.response?.data?.message ?? "Failed to update avatar.");
  }
}

export const asyncaddbooktofavorites = (userId, bookId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/users/favourites/${bookId}`, {});
    if (data.success) {
      dispatch(setbookfavorite(bookId));
    }
  } catch (error) {
    console.error("Failed to add in Favorites", error);
  } 
}

export const asynctogglebookfavorite = (bookId, isFavorite) => async (dispatch) => {
  try {
    const action = isFavorite ? 'remove' : 'add';
    const { data } = await axios.post(`/users/favourites/${bookId}?action=${action}`, {});
     if (data.success) {
      isFavorite ? dispatch(removebookfavorite(bookId)) : dispatch(setbookfavorite(bookId));
    }
  } catch (error) {
    console.error("Failed to add in Favorites", error);
  } 
}