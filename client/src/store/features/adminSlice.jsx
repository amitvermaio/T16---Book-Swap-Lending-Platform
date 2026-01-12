import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: true,
  adminUser: { name: "Verma", role: "Super Admin" }, 
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar } = adminSlice.actions;
export default adminSlice.reducer;