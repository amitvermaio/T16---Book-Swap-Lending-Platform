import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './features/filtersSlice';
import bookSlice from './features/bookSlice';
import userSlice from './features/userSlice';
import requestSlice from './features/requestSlice';
import trackingSlice from './features/trackingSlice';
import notificationSlice from './features/notificationSlice';

const store = configureStore({
  reducer: {
    users: userSlice,
    filters: filtersReducer, 
    books: bookSlice,
    requests: requestSlice,
    trackings: trackingSlice,
    notifications: notificationSlice,
  },
});

export default store;