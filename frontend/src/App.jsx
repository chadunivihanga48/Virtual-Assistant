import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'

function App() {
  

  return (
    <>
     <Routes>
      <Route path= '/signup' element= {<SignUp />} />
      <Route path= '/signin' element= {<SignIn />} />
     </Routes>
    </>
  )
}

export default App
