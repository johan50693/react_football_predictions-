import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { FootballPage } from '../pages/FootballPage'

export const FootballRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={ <FootballPage/> }/>
    </Routes>
  )
}
