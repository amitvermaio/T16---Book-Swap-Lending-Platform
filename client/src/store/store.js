import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './features/filtersSlice';
import bookSlice from './features/bookSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer, 
    books: bookSlice,
  },
});

export default store;