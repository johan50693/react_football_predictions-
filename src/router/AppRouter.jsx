import { useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import { LoginRoutes } from "../auth/routes/LoginRoutes";
import { LoadingSkeleton } from "../football/components/LoadingSkeleton";
import { FootballRoutes } from "../football/router/FootballRoutes";
import { useAuthStore } from "../hooks";



export const AppRouter = () => {

  const { checkAuthToken, status } = useAuthStore();
  // const sesion = 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, [])
  
  if( status == 'checking'){
    return (<LoadingSkeleton/>)
  }

  return (

    <Routes>
      {
        ( status === 'authenticated') 
        ? <Route path="/*" exact  element={<FootballRoutes />}/>
        : <Route path="/auth/*" exact  element={<LoginRoutes />}/>
      }
      <Route path="/*" element={<LoginRoutes/>} />
    </Routes>
  )
}
