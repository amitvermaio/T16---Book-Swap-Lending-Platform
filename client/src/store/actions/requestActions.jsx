/* eslint-disable no-unused-vars */
import axios from '../../config/axiosconfig';
import { 
  loadallincomingrequest,
  loadoutgoingrequests, 
  loadnewincomingrequest, 
  loadnewoutgoingrequest,  
  removeincomingrequest,
  removeoutgoingrequest,
  removenewincomingrequest,
} from '../features/requestSlice';

export const asyncloadallincomingrequests = () => async (dispatch) => {
  try {
    const token = localStorage.get('BookSwap_Token');
    const { data } = await axios.get(`/requests/incoming`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (data.success) {
      dispatch(loadallincomingrequest(data.requests));
    }
  } catch (error) {
    console.error(error);
  }
}

export const asyncloadoutgoingrequests = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');
    const { data } = await axios.get('/requests/outgoing', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (data.success) {
      dispatch(loadoutgoingrequests(data.requests));
    }
  } catch (error) {
    console.error(error);
  }
}

export const asyncsendbookrequest = (bookInfo) => async (dispatch) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');
    const { data } = await axios.post('/requests', bookInfo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (data.success) {
      dispatch(loadnewoutgoingrequest(data.requests));
      return true;
    } else {
      return false;
    }
    
  } catch (error) {
    console.error(error);
  }
}