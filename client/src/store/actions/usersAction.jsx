import axios from "../../config/axiosconfig";
import { loaduser } from "../features/userSlice";

const token = localStorage.getItem('token');

export const asyncaddtofavourite = (id) => async (dispatch, getState) => {
  try {
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
    console.log(token);
    const { data } = await axios.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(data.user)
    dispatch(loaduser(data.user));
  } catch (error) {
    
  }
}