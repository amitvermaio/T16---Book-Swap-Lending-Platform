import axios from "../../config/axiosconfig";
import { toast } from "react-hot-toast";
import {
  loadactivetrackings,
  loadhistory,
  movetohistory,
  removetracking,
  loadselectedtracking,
  setloading,
  seterror
} from "../features/trackingSlice";

export const asyncfetchactivetrackings = () => async (dispatch) => {
  try {
    dispatch(setloading(true));
    const { data } = await axios.get('/requests/active');

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
    const { data } = await axios.get('/requests/history');

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
    const { data } = await axios.patch(`/requests/${requestId}/returned`, {});

    if (data.data) {
      dispatch(movetohistory(data.data));
      toast.success("Book returned & marked as history!");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Update failed");
  }
};

export const asyncverifycollection = (requestId, code) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/requests/${requestId}/verify`, { code });

    if (data.success) {
      toast.success("Code verified! Book collected.");
      dispatch(asyncfetchactivetrackings());
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Verification failed");
  }
};

export const asynccancelrequest = ({ requestId }) => async (dispatch) => {
  try {

    const { data } = await axios.patch(`/requests/${requestId}/status`, { action: 'cancelled' });

    if (data.success) {
      dispatch(removetracking(requestId));
      dispatch(movetohistory(data.data));
      toast("Request Cancelled.", { icon: <FileX /> });
    }

    return true;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update status");
  }
}

export const asyncfetchtrackingbyid = (id) => async (dispatch) => {
  dispatch(setloading(true));
  try {
    const response = await axios.get(`/requests/${id}`);
    dispatch(loadselectedtracking(response.data.request));
  } catch (error) {
    console.error(error);
    dispatch(seterror(error.response?.data?.message || "Failed to fetch tracking details"));
  }
};

export const asyncrateuser = ({ targetUserId, requestId, rating, comment }) => async () => {
  try {
    const { data } = await axios.post('/ratings', { 
      targetUserId,
      requestId,
      rating,
      comment
    });
    if (data.success) {
      toast.success("Thank you for your feedback!");
    }

  } catch (error) {
    console.log(error);
  }
}