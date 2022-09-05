import React, {useEffect, useState} from 'react'
import {PlaidLink} from "react-plaid-link";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PlaidAuth = () => {
  const navigate = useNavigate();
  const [linkToken, setLinkToken] = useState('')
  const [accessToken, setAccessToken] = useState('')
  useEffect(() =>{
    axios.get('/get/linktoken').then(resp => {
      console.log(resp)
      setLinkToken(resp.data.linkToken)
    })
  },[])

 const handleOnExit = (exit) => {
  console.log('exit', exit)
 }

 const handleOnSuccess = (success) => {
  const req = {
    "public_token": success
  }
    axios.post('/get/accesstoken', req).then(resp => {
      setAccessToken(resp.data.accessToken)
      localStorage.setItem('plaidAccessToken', resp.data.accessToken)
      axios.put('/set-plaid-token', {"email": localStorage.getItem('email'), "token": resp.data.accessToken}).then(res => {
        if(res){
          navigate('/dashboard')
        }
      })
    })
 }
  return (
     <div className="py-20">
        <PlaidLink
          clientName="React Plaid Setup"
          env="sandbox"
          product={["auth", "transactions"]}
          token={linkToken}
          onExit={handleOnExit}
          onSuccess={handleOnSuccess}
          className="test"
        >
          Connect your bank account!
        </PlaidLink>
      </div>
  )
}

export default PlaidAuth