import React from 'react'
import { Route, Routes } from "react-router-dom"

// component imorts 
import SignIn from "./features/Signin";
import PlaidAuth  from './features/PlaidAuth';
import Dashboard from './features/Dasboard';
import Signup from './features/Signup'



const RoutesTree = () => {
  return (
    <div>
      <Routes>
        <Route path="/signin"  element={<SignIn/>} />
        <Route path="/plaid-auth"  element={<PlaidAuth/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/signup" element={<Signup />} />
       </Routes>
    </div>
  )
}

export default RoutesTree