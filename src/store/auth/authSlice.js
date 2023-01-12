import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'no-authenticated',
  user: {},
  errorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state,{payload}) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state,{payload}) => {
      state.status = 'no-authenticated';
      state.user = {};
      state.errorMessage = payload?.errorMessage;
    },
    onClearErrorMessage: (state) => {
      state.errorMessage = undefined;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onChecking } = authSlice.actions