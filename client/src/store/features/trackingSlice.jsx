import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTrackings: [],
  history: [],
  selectedTracking: null,
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

    removetracking: (state, action) => {
      state.activeTrackings = state.activeTrackings.filter(
        (item) => item._id !== action.payload
      );
    },

    loadhistory: (state, action) => {
      state.history = action.payload;
      state.isLoading = false;
    },

    addnewtracking: (state, action) => {
      state.activeTrackings.unshift(action.payload);
    },

    movetohistory: (state, action) => {
      const updatedFromBackend = action.payload;
      const index = state.activeTrackings.findIndex(
        (item) => item._id === updatedFromBackend._id
);

      if (index !== -1) {
        const itemToMove = state.activeTrackings[index];
        itemToMove.status = updatedFromBackend.status;
        itemToMove.returnedAt = updatedFromBackend.returnedAt;
        itemToMove.updatedAt = updatedFromBackend.updatedAt;

        
        state.activeTrackings.splice(index, 1);

        // add to history list
        state.history.unshift(itemToMove);
      } else {
        state.history.unshift(updatedFromBackend);
      }
    },

    updateonetrackingstatus: (state, action) => {
      const { requestId, status } = action.payload;
      const index = state.activeTrackings.findIndex((item) => item._id === requestId);
      if (index !== -1) {
        state.activeTrackings[index].status = status;
      }

      const historyIndex = state.history.findIndex((item) => item._id === requestId);
      if (historyIndex !== -1) {
        state.history[historyIndex].status = status;
      }
    },

    loadselectedtracking: (state, action) => {
      state.selectedTracking = action.payload;
      state.isLoading = false;
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
  removetracking,
  updateonetrackingstatus,
  loadselectedtracking,
  setloading,
  seterror,
  clearerror
} = trackingSlice.actions;
export default trackingSlice.reducer;