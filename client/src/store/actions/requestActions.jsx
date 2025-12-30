import axios from '../../config/axiosconfig';
import { 
  loadallincomingrequest,
  loadoutgoingrequests, 
  loadnewoutgoingrequest,  
} from '../features/requestSlice';

export const asyncloadallincomingrequests = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');

    const { data } = await axios.get(`/requests?as=owner`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (data.requests) {
      dispatch(loadallincomingrequest(data.requests));
    }
  } catch (error) {
    console.error(error);
  }
}

export const asyncloadoutgoingrequests = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');
    const { data } = await axios.get('/requests?as=requester', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (data.requests) {
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
      dispatch(loadnewoutgoingrequest(data.request));
      return true;
    } else {
      return false;
    }
    
  } catch (error) {
    console.error(error);
  }
}