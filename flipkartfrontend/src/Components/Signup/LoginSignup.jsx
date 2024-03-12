import React, { useEffect, useState } from 'react'
import logo from "../../Assets/fkheaderlogo_plus-055f80.svg"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import GoogleLoginHandler from './GoogleLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logsignbg from "../../Assets/logsignbg.png";

export const LoginSignup = () => {

  const navigate=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

 const {setUser}=useContext(UserContext);
  const loginUser = async (ev) => {
    ev.preventDefault();

    try {
      
     const response= await axios.post('http://localhost:8080/api/v1/auth/signin', {
             
        email,
        password,
            });
            
            toast.success('User Login successfull');
setUser(response.data.user)
      navigate('/profile');
      const token=response.data.token;
      Cookies.set('token', token, { expires: 7 });
      console.log(token);
    
    } catch (error) {
      
      toast.error('Error Login user:', error);
    }
  };

  return (
    <div className='flex flex-row w-1/2  h-96 mx-auto'>
      <div className='w-1/3 h-full bg-blue-600'>
<h1 className='text-2xl text-white font-mono font-bold pl-3 pt-3'>Log in into your account</h1>
<h1 className='text-lg text-gray-200 font-serif font-bold pl-3 pt-3'>to see your personalized wishlist and recommendations</h1>
<img src={logsignbg} alt="" className="pl-4  pt-9" />
     
      </div>
  <div className='w-2/3'>
  <form className="space-y-6 w-3/4 ml-10" action="http://localhost:8080/api/v1/auth/signin" onSubmit={loginUser} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
              value={email}
              onChange={ev=>setEmail(ev.target.value)}
                  autoComplete="email"
                  required
                  className="block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex w-3/4 items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to='/forgotPassword' className="font-semibold text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
onChange={ev=>setPassword(ev.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-3/4 justify-center rounded-md bg-orange-500 px-3 py-1.5 text-xl font-bold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-3 mr-24 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to='/userSignup' className="font-semibold text-xl leading-6 text-blue-600 hover:text-blue-500">
              Signup
            </Link>
          </p>
          {/* <GoogleLoginHandler/> */}
  </div>
       </div>
  )
}
