import axios from '../../config/axiosconfig';
import { loaduserprofile, loaduserbooks, setloadingbooks, setloadinguser, seterror } from '../features/profileSlice';
import { toast } from 'react-hot-toast';

export const asyncloaduserprofile = (userId) => async (dispatch) => {
  try {
    setloadingbooks(true);
    setloadinguser(true);
    const { data } = await axios.get(`/users/${userId}`);

    dispatch(loaduserprofile(data.user));
    dispatch(loaduserbooks(data.books || []));
  } catch (error) {
    toast.error(error.response?.data?.message || 'Oops! Failed to load profile.');
    dispatch(seterror(error.response?.data?.message || 'Oops! Failed to load profile.'));
  } finally {
    setloadinguser(false);
    setloadingbooks(false);
  }
}