import axios from "../../config/axiosconfig";
import { loaduser } from "../features/userSlice";

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
    
  }
}