import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomingRequests: [],
  outgoingRequests: [],
  newIncomingRequest: 0
};

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    loadallincomingrequest: (state, action) => {
      state.incomingRequests = action.payload;
    },

    loadoutgoingrequests: (state, action) => {
      state.outgoingRequests = action.payload;
    },

    loadnewincomingrequest: (state, action) => {
      state.incomingRequests = [ ...state.incomingRequests, action.payload ];
      state.newIncomingRequest += 1;
    },

    loadnewoutgoingrequest: (state, action) => {
      state.outgoingRequests = [ ...state.outgoingRequests, action.payload ];
    },

    removeincomingrequest: (state, action) => {
      const id = action.payload;
      state.incomingRequests = state.incomingRequests.filter(req => {
        return req._id != id;
      });
    },

    removeoutgoingrequest: (state, action) => {
      const id = action.payload;
      state.outgoingRequests = state.outgoingRequests.filter(req => req._id != id);
    },

    removenewincomingrequest: (state) => {
      state.newIncomingRequest = 0;
    }
  }
});

export const {
  loadallincomingrequest,
  loadoutgoingrequests,
  loadnewincomingrequest,
  loadnewoutgoingrequest,
  removeincomingrequest,
  removeoutgoingrequest,
  removenewincomingrequest,
} = requestSlice.actions;
export default requestSlice.reducer;