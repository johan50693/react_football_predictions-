import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  answers: [],
  active: null
}

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    onLoadAnswers: (state, {payload}) => {
  
      state.answers = payload;
    },
    onActiveAnswer: (state, {payload}) => {
      state.active = payload;
    },
    onUpdateAnswer: (state, {payload}) => {
      state.answers= state.answers.map( answer =>  {
        if (answer.id == payload.id) {
          answer.a_goals_a = payload.goals_a;
          answer.a_goals_b = payload.goals_b;
          answer.a_penalties_a =  payload.penalties_a;
          answer.a_penalties_b =  payload.penalties_b;
          return answer;
        }
        return answer;
      });
    },
    onClearActiveAnswer: (state, {payload}) => {
      state.active = null;
    },
    onClearAnswers: (state, {payload}) => {
      state.answers = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { onLoadAnswers, 
  onActiveAnswer, 
  onUpdateAnswer, 
  onClearActiveAnswer,
  onClearAnswers 
} = answerSlice.actions