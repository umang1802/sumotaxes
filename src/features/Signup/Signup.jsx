import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import  axios from 'axios'

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // const handleEmail = (e) => {
  //   setEmail(e.target.value)
  // }

  // const handlePassword = (e) => {
  //   setPassword(e.target.value)
  // }

  const handleSignUp = () => {
      axios.post('/signup', {"first_name": firstName, "last_name": lastName, "email": email, "password": password, "occupation": occupation}).then((resp) => {
        if(resp.status === 201) {
          localStorage.setItem('email', email)
            navigate('/plaid-auth')
        }
      }).catch(err => {
        console.log('err', err)
      })
      
    
  }

  const responseGoogle = (resp) => {
    console.log(resp)
  }
  return (
    <div>
      <div clssName="px-10">
      <p className="mt-10 ml-10 text-left font-semibold text-4xl text-gray-900">Register</p>
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
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="mt-6 px-3 py-4 bg-gray-200 text-gray-500 focus:ring-blue-500 w-full shadow-sm rounded-sm"  placeholder="Please Enter Your First Name" />
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="mt-6 px-3 py-4 bg-gray-200 text-gray-500 focus:ring-blue-500 w-full shadow-sm rounded-sm"  placeholder="Please Enter Your Last Name" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-6 px-3 py-4 bg-gray-200 text-gray-500 focus:ring-blue-500 w-full shadow-sm rounded-sm"  placeholder="Please Enter Your Password" />
        <input value={cpassword} onChange={(e) => setCPassword(e.target.value)} type="password" className="mt-6 px-3 py-4 bg-gray-200 text-gray-500 focus:ring-blue-500 w-full shadow-sm rounded-sm"  placeholder="Confirm Your Password" />
        <input value={occupation} onChange={(e) => setOccupation(e.target.value)} type="text" className="mt-6 px-3 py-4 bg-gray-200 text-gray-500 focus:ring-blue-500 w-full shadow-sm rounded-sm"  placeholder="Please Enter Your Occupation" />
      </div>
      <div className="mt-8 mr-10 ml-10">
        <button onClick={handleSignUp} className="text-center py-4 text-white bg-rose-400 w-full rounded-sm shadow-sm font-semibold text-base">SIGN IN</button>
      </div>
      <div className="mt-8 mr-10 ml-10">
        <p className="text-center text-sm text-gray-800 ">Already have and accounf</p>
        <p  onClick={() => { navigate('/signin') } }className="text-center text-sm text-blue-500">Log In</p>
      </div>
     
    </div>
      {/* <div className="flex flex-col items-center justify-center px-8 py-8">
        <p className="font-semibold text-3xl text-gray-700 font-sans" >Sign up</p>
         <div className="w-full">
            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left">First Name</label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-300 focus:border-emerald-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Email" required />
        </div>
        <div className="w-full">
            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left">First Name</label>
            <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} id="lname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-300 focus:border-emerald-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Email" required />
        </div>
        <div className="w-full">
            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left">Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-300 focus:border-emerald-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Email" required />
        </div>
        <div className="w-full mt-4">
            <label for="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-300 focus:border-emerald-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" required />
        </div>
         <div className="w-full mt-4">
            <label for="confirm_password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left">Confirm Password</label>
            <input type="password" value={cpassword} onChange={(e) => setCPassword(e.target.value)} id="cpassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-300 focus:border-emerald-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" required />
        </div>
        <div className="w-full mt-4">
            <label for="occupation"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left">Occupation</label>
            <input type="password" value={occupation} onChange={(e) => setOccupation(e.target.value)} id="occupation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-300 focus:border-emerald-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" required />
        </div>
        <div className="w-full mt-4">
          <button onClick={handleSignUp} class="w-full bg-transparent hover:bg-emerald-300 text-emerald-700 font-semibold hover:text-white py-2 px-4 border border-emerald-500 hover:border-transparent rounded">
            Sign up
          </button>
        </div>
        <div className="mt-4 w-full">
          <GoogleLogin
          clientId="87401580219-iesj712tikdpcdkd4g6gu745ek8fkssq.apps.googleusercontent.com"
          buttonText="Sign In Through Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        </div>
        
      </div> */}
    </div>
  )
}
