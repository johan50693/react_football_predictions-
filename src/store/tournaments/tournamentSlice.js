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
      // payload.data.forEach(tournament => {
      //   const exist = state.tournaments.some( item => item.id === tournament.id);
      //   if (!exist) {
      //     state.tournaments.push(tournament);
      //   }
      // });
    },
    onAddNewTournament: (state,{payload}) => {
      state.tournaments.push(payload);
      state.active = null;
    },
    onDeleteTournament: (state) => {

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
  },
})


// Action creators are generated for each case reducer function
export const  { onLoadTournaments,
                onDeleteTournament,
                onUpdateTournament,
                onActiveTournament,
                onAddNewTournament,
              } = tournamentSlice.actions