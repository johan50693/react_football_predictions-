import { Satellite } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  matches: [],
}

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    onLoadMatch: (state, {payload}) => {
  
      state.matches=payload.map(item => {
  
        const date= item.date.split('T');
        item.date= date[0];
        return item;
      });
    },
    onDeleteMatch: (state,{payload}) => {
      state.matches = state.matches.filter( match => match.id != payload.id)
    },
  },
})

// Action creators are generated for each case reducer function
export const { onLoadMatch, onDeleteMatch } = matchSlice.actions