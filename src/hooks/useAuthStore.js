import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import footballApi from '../apis/footballApi';
import { onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const startLogin = async ({email, password}) => {

    dispatch(onChecking());
    try {
      const {data} = await footballApi.post('/auth/login',{email,password});
      localStorage.setItem('token',data.token);
      localStorage.setItem('token-date',new Date().getTime());

      dispatch(onLogin({name: data.name,uid: data.uid}));  
    } catch (error) {

      dispatch(onLogout())
      Swal.fire({
        title: "Login fallido",
        text: error.response.data.message,
        icon: "error"
      })
    }
  }

  const startRegister = async ({name,email,password}) => {
    dispatch(onChecking());
    
    try {
      const {data} = await footballApi.post('/auth/create',{name,email,password});
      localStorage.setItem('token',data.token);
      localStorage.setItem('token-date',new Date().getTime());

      dispatch(onLogin({name: data.name,uid: data.uid})); 
    } catch (error) {
      dispatch(onLogout())
      Swal.fire({
        title: "Registro fallido",
        text: error.response.data.message,
        icon: "error"
      })
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout())

    
    try {
      const {data} = await footballApi.get('/auth/refresh');
      localStorage.setItem('token',data.token);
      localStorage.setItem('token-date',new Date().getTime());
      dispatch(onLogin({name: data.name,uid: data.uid})); 
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  }

  return {
          // * Atributos
          status, 
          user, 
          errorMessage,
          // * Metodos
          startLogin,
          checkAuthToken,
          startRegister,
  }
}
