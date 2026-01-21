import axios from '../../config/axiosconfig';
import { toast } from 'react-hot-toast';
import {
  loaduserslist,
  changeuserrole,
  loadbookslist,
  removebookfromlist,
  setanalyticsloading,
  loadtopbooks,
  loadtopcontributors,
  loadborrowingtrends,
  loaddisputes,
  loadongoingrequestscount,
} from '../features/adminSlice';

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

export const asyncchangeuserrole = (userId, newRole) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/admin/users/${userId}/role`, { role: newRole });
    if (data.success) {
      dispatch(changeuserrole(data.user));
      toast.success("User role updated successfully");
    }
  } catch {
    toast.error("Failed to update user role");
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

export const asyncfetchbooks = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/admin/books`);
    if (data.success) {
      dispatch(loadbookslist(data.books));
    }
  } catch {
    toast.error("Failed to fetch books");
  }
}

export const asyncdeletebook = (bookId, reason) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/admin/books/${bookId}`, { reason });
    if (data.success) {
      dispatch(removebookfromlist(bookId));
      toast.success("Book deleted successfully");
    }
  } catch {
    toast.error("Failed to delete book");
  }
}

export const asyncfetchanalytics = () => async (dispatch) => {
  try {
    dispatch(setanalyticsloading());

    const [booksRes, contributorsRes, trendsRes, requestsRes] = await Promise.all([
      axios.get('/analytics/top-books'),
      axios.get('/analytics/top-contributors'),
      axios.get('/analytics/trends'),
      axios.get('/admin/requests')
    ]);

    dispatch(loadtopbooks(booksRes.data.data));
    dispatch(loadtopcontributors(contributorsRes.data.data));
    dispatch(loadborrowingtrends(trendsRes.data.data));
    dispatch(loadongoingrequestscount(requestsRes.data.requests));
  } catch (error) {
    console.error(error);
    toast.error("Failed to load analytics data");
  }
};

export const asyncfetchdisputes = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/admin/disputes`);
    dispatch(loaddisputes(data.disputes));
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch disputes");
  }
}