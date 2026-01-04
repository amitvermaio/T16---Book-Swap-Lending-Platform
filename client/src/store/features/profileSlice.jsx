import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  books: null,
  loadingUser: false,
  loadingBooks: false,
  error: null,
}

const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    loaduserprofile: (state, action) => {
      state.user = action.payload;
    },
    loaduserbooks: (state, action) => {
      state.books = action.payload;
    },
    setloadinguser: (state, action) => {
      state.loadingUser = action.payload;
    },
    setloadingbooks: (state, action) => {
      state.loadingBooks = action.payload;
    },
    seterror: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  loaduserbooks, 
  loaduserprofile, 
  setloadingbooks, 
  setloadinguser,
  seterror
} = profileSlice.actions;
export default profileSlice.reducer;