import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenModal: (state, /*action*/) => {
      state.open = true;
    },
    onCloseModal: (state, /*action*/) => {
      state.open = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal } = uiSlice.actions