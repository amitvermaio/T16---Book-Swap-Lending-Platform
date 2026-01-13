import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersList: [],
  pendingRequests: [],
  flaggedContent: [],
  disputes: [],

  analytics: {
    stats: { totalUsers: 0, activeListings: 0, ongoingBorrows: 0, openDisputes: 0 },
    borrowingTrends: [],
    topContributors: [],
  },

  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loaduserslist: (state, action) => {
      state.usersList = action.payload;
      state.isLoading = false;
    },
    loadpendingrequests: (state, action) => {
      state.pendingRequests = action.payload;
      state.isLoading = false;
    },
    handlerequestaction: (state, action) => {
      const { requestId } = action.payload;
      state.pendingRequests = state.pendingRequests.filter(req => req.id !== requestId);
    },
    loadflaggedcontent: (state, action) => {
      state.flaggedContent = action.payload;
      state.isLoading = false;
    },
    loadadminanalytics: (state, action) => {
      state.analytics = action.payload;
      state.isLoading = false;
    },
    setadminloading: (state, action) => {
      state.isLoading = action.payload;
    },
    setadminerror: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  },
});

export const {
  loaduserslist,
  loadpendingrequests,
  handlerequestaction,
  loadflaggedcontent,
  loadadminanalytics,
  setadminloading,
  setadminerror
} = adminSlice.actions;

export default adminSlice.reducer;