import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  currentPage: 1,
  hasMore: true,
  loading: false,
  
  bookDetails: {
    book: null,
    related: [],
    favorite: false,
  },

  loadingBookDetails: false,
};

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
    addnewbook: (state, action) => {
      state.books.unshift(action.payload);
    },
    resetbooks: (state) => {
      state.books = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
    setcurrentbook: (state, action) => {
      state.bookDetails.book = action.payload.book;
      state.bookDetails.related = action.payload.relatedBooks
    },
    setcurrentbookloading: (state, action) => {
      state.loadingCurrentBook = action.payload;
    },
  }
})

export const { setloading,
  loadbooks, 
  resetbooks, 
  setcurrentbook, 
  setcurrentbookloading,  
  addnewbook 
} = bookSlice.actions;
export default bookSlice.reducer;

