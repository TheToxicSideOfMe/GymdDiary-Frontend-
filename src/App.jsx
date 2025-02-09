import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Home from './pages/Home';
import Header from './components/Header';
import SplitsPage from './pages/SplitsPage';
import WorkoutsPage from './pages/WorkoutsPage';
import WorkoutLogPage from './pages/WorkoutLogPage';

import LoggingPage from './pages/LoggingPage';
import TrackProgressPage from './pages/TrackProgressPage';
import AboutPage from './pages/AboutPage';


function App() {


  return (
    <>

      <div className="min-h-screen bg-[#1a1a1a]">
        <Header/>
        <main className="pt-20">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/splits' element={<SplitsPage/>}/>
          <Route path="/splits/:splitId/workouts" element={<WorkoutsPage />} />
          <Route path='/log-workout' element={<WorkoutLogPage/>}/>
          <Route path="/log-workout/:splitId/workouts" element={<LoggingPage />} />
          <Route path='/track-progress' element={<TrackProgressPage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
        </Routes>
        </main>
        </div>
    </>
  )
}

export default App
