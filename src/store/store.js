
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { matchSlice } from './match/matchSlice';
import { tournamentSlice } from './tournaments/tournamentSlice';


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tournament: tournamentSlice.reducer,
    match: matchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
    serializableCheck: false
  }),
})

export default store;
