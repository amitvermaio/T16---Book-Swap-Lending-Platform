import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersList: [],
  booksList: [],
  pendingRequests: [],
  disputes: [],
  onGoingRequests: 0,

  analytics: {
    topBooks: [],
    topContributors: [],
    borrowingTrends: [],
    isLoading: false,
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
    changeuserrole: (state, action) => {
      const updatedUser = action.payload;
      const index = state.usersList.findIndex(user => user._id === updatedUser._id);
      if (index !== -1) {
        state.usersList[index] = updatedUser;
      }
    },
    loadbookslist: (state, action) => {
      state.booksList = action.payload;
      state.isLoading = false;
    },
    removebookfromlist: (state, action) => {
      const bookId = action.payload;
      state.booksList = state.booksList.filter(book => book._id !== bookId);
    },
    loadpendingrequests: (state, action) => {
      state.pendingRequests = action.payload;
      state.isLoading = false;
    },
    handlerequestaction: (state, action) => {
      const { requestId } = action.payload;
      state.pendingRequests = state.pendingRequests.filter(req => req.id !== requestId);
    },
    setanalyticsloading: (state) => {
      state.analytics.isLoading = true;
    },
    loadtopbooks: (state, action) => {
      state.analytics.topBooks = action.payload;
      state.analytics.isLoading = false;
    },
    loadtopcontributors: (state, action) => {
      state.analytics.topContributors = action.payload;
      state.analytics.isLoading = false;
    },
    loadborrowingtrends: (state, action) => {
      state.analytics.borrowingTrends = action.payload;
      state.analytics.isLoading = false;
    },
    loadongoingrequestscount: (state, action) => {
      state.onGoingRequests = action.payload;
      state.isLoading = false;
    },
    setadminerror: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    loaddisputes: (state, action) => {
      state.disputes = action.payload;
      state.isLoading = false;
    }
  },
});

export const {
  loaduserslist,
  changeuserrole,
  loadbookslist,
  loadpendingrequests,
  handlerequestaction,
  setadminloading,
  setadminerror,
  removebookfromlist,
  setanalyticsloading,
  loadtopbooks,
  loadtopcontributors,
  loadborrowingtrends,
  loaddisputes,
  loadongoingrequestscount,
} = adminSlice.actions;

export default adminSlice.reducer;