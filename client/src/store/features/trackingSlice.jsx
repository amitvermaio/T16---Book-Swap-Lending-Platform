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

      // find the index of the item in the CURRENT active list
      // This ensures we have the item with 'book' and 'owner' already populated
      const index = state.activeTrackings.findIndex(
        (item) => item._id === updatedFromBackend._id
      );

      if (index !== -1) {
        // get the existing populated item
        const itemToMove = state.activeTrackings[index];

        // update key fields (status/dates) from backend response
        // We do NOT spread (...updatedFromBackend) entirely, because that 
        // would overwrite the populated 'book' object with a plain string ID.
        itemToMove.status = updatedFromBackend.status;
        itemToMove.returnedAt = updatedFromBackend.returnedAt;
        itemToMove.updatedAt = updatedFromBackend.updatedAt;

        // remove from active list
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
  setloading,
  seterror,
  clearerror
} = trackingSlice.actions;
export default trackingSlice.reducer;