import axios from '../../config/axiosconfig';
import { 
  setNotifications, 
  markAllRead 
} from '../features/notificationSlice';

export const asyncfetchnotifications = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');
    const { data } = await axios.get('/notifications', { 
      headers: { Authorization: `Bearer ${token}` }
    });

    if (data.notifications) {
      dispatch(setNotifications(data.notifications));
    }
  } catch (error) {
    console.error("Failed to fetch notifications", error);
  }
};

export const asyncmarkallread = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');
    await axios.patch('/notifications/read-all', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    dispatch(markAllRead());
  } catch (error) {
    console.error(error);
  }
};