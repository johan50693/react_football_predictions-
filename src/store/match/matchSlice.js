import { Satellite } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  matches: [],
  active: null,
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
    onActiveMatch: (state, {payload}) => {
      state.active = payload;
    },
    onClearActiveMatch: (state, {payload}) => {
      state.active = null;
    },
    onUpdateMatch: (state, {payload}) => {
      state.matches= state.matches.map( match =>  {
        if (match.id == payload.id) {
          return payload;
        }
        return match;
      });
    },
    onAddNewMatch: (state,{payload}) => {
      state.matches.push(payload);
      state.active = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { onLoadMatch, onDeleteMatch, onActiveMatch, onUpdateMatch, onClearActiveMatch, onAddNewMatch } = matchSlice.actions