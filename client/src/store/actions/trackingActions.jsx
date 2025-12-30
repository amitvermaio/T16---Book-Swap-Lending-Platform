import axios from "../../config/axiosconfig";
import { toast } from "react-hot-toast";
import {
  loadactivetrackings,
  loadhistory,
  movetohistory,
  setloading,
  seterror
} from "../features/trackingSlice";

export const asyncfetchactivetrackings = () => async (dispatch) => {
  try {
    dispatch(setloading(true));
    const token = localStorage.getItem('BookSwap_Token');
    const { data } = await axios.get('/requests/active', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (data.data) {
      dispatch(loadactivetrackings(data.data));
    }
  } catch (error) {
    console.error(error);
    dispatch(seterror(error.response?.data?.message || "Failed to fetch active trackings"));
  }
};

export const asyncfetchhistory = () => async (dispatch) => {
  try {
    dispatch(setloading(true));
    const token = localStorage.getItem('BookSwap_Token');
    const { data } = await axios.get('/requests/history', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (data.data) {
      dispatch(loadhistory(data.data));
    }
  } catch (error) {
    console.error(error);
    dispatch(seterror(error.response?.data?.message || "Failed to fetch history"));
  }
};


export const asyncmarkcomplete = (requestId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('BookSwap_Token');
    const { data } = await axios.put(`/requests/${requestId}/status`,
      { action: "completed" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.data) {
      dispatch(movetohistory(data.data));
      toast.success("Book returned & marked as history!");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Update failed");
  }
};