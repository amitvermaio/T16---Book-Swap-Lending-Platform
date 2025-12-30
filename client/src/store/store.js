import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './features/filtersSlice';
import bookSlice from './features/bookSlice';
import userSlice from './features/userSlice';
import requestSlice from './features/requestSlice';

const store = configureStore({
  reducer: {
    users: userSlice,
    filters: filtersReducer, 
    books: bookSlice,
    requests: requestSlice,
  },
});

export default store;