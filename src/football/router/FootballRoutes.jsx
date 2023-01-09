import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { FootballPage } from '../pages/FootballPage'
import { FootballParticipantsPage } from '../pages/FootballParticipantsPage'
import { FootballPredictionPage } from '../pages/FootballPredictionPage'
import { FootballTournamentPage } from '../pages/FootballTournamentPage'
import { FootbalPoolPage } from '../pages/FootbalPoolPage'

export const FootballRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={ <FootballPage/> }/>
      <Route path='/tournament/create' element={ <FootballTournamentPage/> }/>
      <Route path='/tournament/:id/prediction/' element={ <FootballPredictionPage/> }/>
      <Route path='/tournament/:id/poll' element={ <FootbalPoolPage/> }/>
      <Route path='/tournament/:id/participants' element={ <FootballParticipantsPage/> }/>
    </Routes>
  )
}
