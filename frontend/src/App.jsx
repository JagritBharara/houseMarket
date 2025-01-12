import { useState } from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Offers from './pages/Offers'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

function App() {


  return (
    <>
      <Routes>

        <Route path='/' element={<HomePage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/offers' element={<Offers/>}/>
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </>
  )
}

export default App
