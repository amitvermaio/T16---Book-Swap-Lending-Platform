import axios from '../../config/axiosconfig';
import { toast } from 'react-hot-toast';
import { loaduserslist } from '../features/adminSlice';

export const asyncfetchusers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/admin/users`);
    if (data.success) {
      dispatch(loaduserslist(data.users));
    }
  } catch {
    toast.error("Failed to fetch users");
  }
}

export const asynctoggleuserban = (userId, isBan) => async (dispatch) => {
  try {
    await axios.patch(`/admin/users/${userId}/ban`, { isBan });
    dispatch({ type: 'TOGGLE_USER_BAN_SUCCESS', payload: { userId, isBan } });
    toast.success(`User has been ${isBan ? 'banned' : 'unbanned'} successfully`);
  } catch {
    toast.error("Failed to update user status");
  }
}