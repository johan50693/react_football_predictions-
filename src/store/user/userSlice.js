import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usersPoints: [],
  isAssigned: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLoadUsers: (state, {payload}) => {
      state.usersPoints = payload;
    },
    onOpenAssigned: (state, {payload}) => {
      state.isAssigned = true;
    },
    onCloseAssigned: (state, {payload}) => {
      state.isAssigned = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { onLoadUsers, onOpenAssigned, onCloseAssigned } = userSlice.actions