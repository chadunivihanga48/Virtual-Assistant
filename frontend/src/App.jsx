import React, { useState, useContext } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Customize from './pages/Customize.jsx';
import Home from './pages/Home.jsx';
import { userDataContext } from './context/userContext.jsx';

function App() {
  const {userData, setUserData} = useContext(userDataContext)

  return (
    <>
    <Routes>
     <Route path="/" element={(userData?.assistantImage && userData?.assistantName) ? <Home /> : <Navigate to={"customize"}/>} />
     <Route path='/signup' element={!userData?<SignUp />: <Navigate to = {"/"} />}/>
     <Route path='/signin' element={!userData?<SignIn />: <Navigate to = {"/"}/> } />
    <Route path='/customize' element={<Customize />} />
     
    </Routes>
    </>
  )
}

export default App
