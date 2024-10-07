import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import UserPage from './components/UserPage'
import AdminPage from './components/AdminPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<UserPage />}/>
        <Route path='/login' element={<AdminPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
