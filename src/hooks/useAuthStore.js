import { useDispatch, useSelector } from 'react-redux'
import { onChecking, onLogin } from '../store';

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const startLogin = async ({email, password}) => {

    dispatch(onChecking());

    try {
      dispatch(onLogin({name: 'Albert', email: 'albert@yopmail.com'}));  
    } catch (error) {
      
    }
  }

  return {
          // * Atributos

          // * Metodos
          startLogin,
  }
}
