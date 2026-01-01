import { toast } from 'react-hot-toast';
import {
  loadallincomingrequest,
  loadoutgoingrequests,
  loadnewoutgoingrequest,
  removeincomingrequest,
} from '../features/requestSlice';
import { FileX } from 'lucide-react';
import axios from '../../config/axiosconfig';

export const asyncloadallincomingrequests = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/requests?as=owner`);
    if (data.requests) {
      dispatch(loadallincomingrequest(data.requests));
    }
  } catch (error) {
    console.error(error);
  }
}

export const asyncloadoutgoingrequests = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/requests?as=requester');

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
      toast.success("Request Sent Successfully!");
      return true;
    } else {
      toast.error(data.message || "Failed to send request");
      return false;
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send request");
  }
}

export const asyncupdaterequeststatus = ({ requestId, action, pickupInfo }) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/requests/${requestId}/status`, { action, pickupInfo });

    if (data.success && action === 'approved') {
      dispatch(removeincomingrequest(requestId));
      toast.success("Request Approved! Book moved to Tracking.");
    } else if (data.success && action === 'rejected') {
      dispatch(removeincomingrequest(requestId));
      toast.success("Request Rejected.");
    } else if (data.success && action === 'cancelled') {
      dispatch(removeincomingrequest(requestId));
      toast("Request Cancelled.", { icon: <FileX /> });
    } else {
      toast.success(data.message || "Status Updated Successfully");
    }
    return true;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update status");
  }
}