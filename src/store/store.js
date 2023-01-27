
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { matchSlice } from './match/matchSlice';
import { tournamentSlice } from './tournaments/tournamentSlice';
import { uiSlice } from './ui/uiSlice';


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tournament: tournamentSlice.reducer,
    match: matchSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
    serializableCheck: false
  }),
})

export default store;
