import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  bookCollection: [],
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
    setauthentication: (state, action) => {
      state.isAuthorized = action.payload;
    },
    setuserloading: (state, action) => {
      state.loading = action.payload;
    },
    loaduserbooks: (state, action) => {
      state.bookCollection = action.payload;
    }
  }
});

export const { loaduser, removeuser, setuserloading, loaduserbooks, setauthentication } = userSlice.actions;
export default userSlice.reducer;