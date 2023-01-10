import { Route, Routes } from "react-router-dom"
import { LoginRoutes } from "../auth/routes/LoginRoutes";
import { FootballRoutes } from "../football/router/FootballRoutes";



export const AppRouter = () => {

  const sesion = 'not-authenticated';

  return (

    <Routes>
      {
        ( sesion === 'authenticated') 
        ? <Route path="/*" exact  element={<FootballRoutes />}/>
        : <Route path="/auth/*" exact  element={<LoginRoutes />}/>
      }
      <Route path="/*" element={<LoginRoutes/>} />
    </Routes>
  )
}
