import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route,Routes } from 'react-router-dom'
import SignIn from './signUp'
import UserSignup from './newUserSignup'
import './App.css'

const  App=()=> {
  
  return (
    <>
     <Routes>
       <Route path='/' element={<SignIn/>}/>
       <Route path='/signup' element={<UserSignup/>}/>
     </Routes>
    </>
  )
}

export default App
