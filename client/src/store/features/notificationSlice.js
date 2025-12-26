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
    setNotifications: (state, action) => {
      state.list = action.payload;
      state.unreadCount = action.payload.filter(n => !n.read).length;
    },

    addNotification: (state, action) => {
      state.list.unshift(action.payload);
      state.unreadCount += 1;
    },

    markAllRead: (state) => {
      state.list.forEach(n => (n.read = true));
      state.unreadCount = 0;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAllRead,
} = notificationSlice.actions;

export default notificationSlice.reducer;
