import { toast } from 'react-hot-toast';
import {
  loadallincomingrequest,
  loadoutgoingrequests,
  loadnewoutgoingrequest,
  removeincomingrequest,
} from '../features/requestSlice';
import axios from '../../config/axiosconfig';

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

export const asyncupdaterequeststatus = ({ requestId, action, pickupInfo }) => async (dispatch) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');
    const { data } = await axios.patch(`/requests/${requestId}/status`, { action, pickupInfo }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (data.success && action === 'approved') {
      dispatch(removeincomingrequest(requestId));
      toast.success("Request Approved! Book moved to Tracking.");
      return true;
    } else if (data.success && action === 'rejected') {
      dispatch(removeincomingrequest(requestId));
      toast.success("Request Rejected.");
      return true;
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to update status");
  }
}