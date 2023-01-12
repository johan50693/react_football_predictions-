
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {authSlice} from './';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
    serializableCheck: false
  }),
})

export default store;