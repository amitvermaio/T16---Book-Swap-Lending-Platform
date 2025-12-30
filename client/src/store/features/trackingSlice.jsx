import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTrackings: [], 
  history: [],         
  isLoading: false,
  error: null,
};

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    loadactivetrackings: (state, action) => {
      state.activeTrackings = action.payload;
      state.isLoading = false;
    },

    loadhistory: (state, action) => {
      state.history = action.payload;
      state.isLoading = false;
    },

    addnewtracking: (state, action) => {
      state.activeTrackings.unshift(action.payload);
    },

    movetohistory: (state, action) => {
      const completedRequest = action.payload;
      state.activeTrackings = state.activeTrackings.filter(
        (item) => item._id !== completedRequest._id
      );
      state.history.unshift(completedRequest);
    },

    setloading: (state, action) => {
      state.isLoading = action.payload;
    },

    seterror: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    clearerror: (state) => {
      state.error = null;
    }
  },
});

export const { 
  loadactivetrackings, 
  loadhistory, 
  addnewtracking, 
  movetohistory, 
  setloading, 
  seterror, 
  clearerror 
} = trackingSlice.actions;
export default trackingSlice.reducer;