
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { tournamentSlice } from './tournaments/tournamentSlice';


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tournament: tournamentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
    serializableCheck: false
  }),
})

export default store;
