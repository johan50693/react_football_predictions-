import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import footballApi from '../apis/footballApi';
import { onClearActiveAnswer, onLoadAnswers, onUpdateAnswer } from '../store';
import { useUiStore } from './useUiStore';

export const useAnswerStore = () => {
  
  const {answers} = useSelector(state => state.answer);
  const {active} = useSelector( state => state.tournament);
  const { closeModal} = useUiStore();
  const dispatch = useDispatch();

  const startLoadAnswers = async () => {

    try {
      const {data} = await footballApi.get(`/answer/list/${active.id}`);
      dispatch(onLoadAnswers(data.data))
    } catch (error) {
      console.log(error);
    }
  }

  const startUpdateAnswer = async ({id,poll_id,goals_a,goals_b,penalties_a,penalties_b,date}) => {
    try {
      
      const body = {
        id,
        poll_id,
        goals_a: (goals_a === '') ? null: goals_a,
        goals_b: (goals_b === '') ? null: goals_b,
        penalties_a: (penalties_a === '' || penalties_a === undefined) ? null: penalties_a,
        penalties_b: (penalties_b === '' || penalties_b === undefined) ? null: penalties_b,
        date
      };
      
      const {data} = await footballApi.put(`/answer/${id}`,body);
      dispatch(onUpdateAnswer({id,poll_id,goals_a,goals_b,penalties_a,penalties_b,date}));
      closeModal();
      Swal.fire(data.message, '', 'success');
      dispatch(onClearActiveAnswer());
      
    } catch (error) {
      // console.log(error);
      Swal.fire(error.response.data.message, '', 'info');
    }
  }
  
  return {
    // Propiedades
    answers,
    // Metodos
    startLoadAnswers,
    startUpdateAnswer,
  }
}
