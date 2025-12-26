import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthorized: false,
  loading: false
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loaduser: (state, action) => {
      state.user = action.payload;
      state.isAuthorized = true
      state.loading = false
    },
    removeuser: (state, action) => {
      state.user = null;
      state.isAuthorized = false;
      state.loading = false
    },
    setuserloading: (state, action) => {
      state.loading = action.payload;
    } 
  }
});

export const { loaduser, removeuser, setuserloading } = userSlice.actions;
export default userSlice.reducer;