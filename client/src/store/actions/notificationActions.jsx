import axios from '../../config/axiosconfig';
import { 
  setnotifications, 
  markallread 
} from '../features/notificationSlice';

export const asyncfetchnotifications = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/notifications');

    if (data.notifications) {
      dispatch(setnotifications(data.notifications));
    }
  } catch (error) {
    console.error("Failed to fetch notifications", error);
  }
};

export const asyncmarkallread = () => async (dispatch) => {
  try {
    await axios.patch('/notifications/read-all', {});
    
    dispatch(markallread());
  } catch (error) {
    console.error(error);
  }
};