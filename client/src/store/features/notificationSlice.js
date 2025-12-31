import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  unreadCount: 0,
  loading: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setnotifications: (state, action) => {
      state.list = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length;
    },

    addnotification: (state, action) => {
      state.list.unshift(action.payload);
      state.unreadCount += 1;
    },

    markallread: (state) => {
      state.list.forEach(n => (n.isRead = true));
      state.unreadCount = 0;
    },
  },
});

export const {
  setnotifications,
  addnotification,
  markallread,
} = notificationSlice.actions;

export default notificationSlice.reducer;