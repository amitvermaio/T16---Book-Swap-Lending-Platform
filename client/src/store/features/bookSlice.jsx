import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  currentPage: 1,
  hasMore: true,
  loading: false,
  currentBook: null,
}

const bookSlice = createSlice({
  name: 'books',  
  initialState,
  reducers: {
    setloading: (state, action) => {
      state.loading = action.payload
    },
    loadbooks: (state, action) => {
      state.books.push(...action.payload.books);
      state.currentPage = action.payload.page;
      state.hasMore = action.payload.hasMore;
      state.loading = false;
    },
    resetbooks: (state) => {
      state.books = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  }
})

export const { setloading, loadbooks, resetbooks } = bookSlice.actions;
export default bookSlice.reducer;

