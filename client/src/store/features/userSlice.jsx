import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  bookCollection: [],
  isAuthorized: false,
  favorites: [],
  loading: false
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loaduser: (state, action) => {
      state.user = action.payload;
      state.favorites = action.payload.favorites || [];
      state.isAuthorized = true
      state.loading = false
    },
    removeuser: (state) => {
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
    },
    setbookfavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removebookfavorite: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    }
  }
});

export const selectFavoriteSet = createSelector(
  state => state.users.favorites,
  favorites => new Set(favorites)
);

export const { 
  loaduser, 
  removeuser, 
  setuserloading, 
  setauthentication,
  loaduserbooks, 
  setbookfavorite, 
  removebookfavorite
} = userSlice.actions;
export default userSlice.reducer;