import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import  axios from 'axios'

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if(email !== "" && password !== "" ) {

      axios.post('/signin', {"email": email, password: "password"}).then((resp) => {

        if(resp.status === 200) {
          localStorage.setItem("email", email)
            navigate('/dashboard');
        }
      }).catch(err => {
        console.log('err', err)
      })
      
    }
  }

  const responseGoogle = (resp) => {
    console.log(resp)
  }
  return (
    <div clssName="px-10">
      <p className="mt-10 ml-10 text-left font-semibold text-4xl text-gray-900">Login</p>
      <div className="mt-10 ml-10 mr-10  flex items-center justify-center">
        <GoogleLogin
          clientId="87401580219-iesj712tikdpcdkd4g6gu745ek8fkssq.apps.googleusercontent.com"
          buttonText="Sign In Through Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        >
          {/* <div className="py-4 px-8 bg-gray-300 text-gray-700 w-full  text-center shadow-md rounded-sm" >Google</div> */}
        </GoogleLogin>
        
        
      </div>
      <div className="mt-8 mr-10 ml-10">
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="px-3 py-4 bg-gray-200 text-gray-500 focus:ring-blue-500 w-full shadow-sm rounded-sm"  placeholder="Please Enter Your Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-6 px-3 py-4 bg-gray-200 text-gray-500 focus:ring-blue-500 w-full shadow-sm rounded-sm"  placeholder="Please Enter Your Password" />
      </div>
      <div className="mt-8 mr-10 ml-10">
        <button onClick={handleSignIn} className="text-center py-4 text-white bg-rose-400 w-full rounded-sm shadow-sm font-semibold text-base">SIGN IN</button>
      </div>
      <div className="mt-8 mr-10 ml-10">
        <p className="text-center text-sm text-gray-800 ">Don't have an account</p>
        <p  onClick={() => { navigate('/signup') } }className="text-center text-sm text-blue-500">Register</p>
      </div>
     
    </div>
  )
}
