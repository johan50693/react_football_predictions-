import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tournaments: [],
  active: null,
  isLoadingEvents: true
}

export const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    onLoadTournaments: (state, {payload= []}) => {
      state.isLoadingEvents = false;
      state.active = null;
      state.tournaments = payload.data;
    },
    onAddNewTournament: (state,{payload}) => {
      state.tournaments.push(payload);
      state.active = null;
    },
    onDeleteTournament: (state,{payload}) => {
      state.active = null;
      state.tournaments = state.tournaments.filter( tournament => tournament.id != payload.id)
    },
    onUpdateTournament: (state, {payload}) => {
      state.tournaments= state.tournaments.map( tournament =>  {
        if (tournament.id == payload.id) {
          return payload;
        }
        return tournament;
      });
    },
    onActiveTournament: (state, {payload}) => {
      state.active = payload;
    },
    onClearActiveTournament: (state, {payload}) => {
      state.active = null;
    },
    onClearTournaments: (state, {payload}) => {
      state.tournaments = [];
    },
  },
})


// Action creators are generated for each case reducer function
export const  { onLoadTournaments,
                onDeleteTournament,
                onUpdateTournament,
                onActiveTournament,
                onAddNewTournament,
                onClearActiveTournament,
                onClearTournaments,
              } = tournamentSlice.actions