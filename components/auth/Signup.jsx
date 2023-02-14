import React, { useState, useRef, useContext } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import CancelIcon from '@mui/icons-material/Cancel'
import Input from '../forms/Input'
import Label from '../forms/Label'
import ButtonField from '../forms/ButtonField'
import Preloader from '../Preloader'
// context
import { MainContext } from '../../contexts/MainContext'
import { LoadingContext } from '../../contexts/LoadingContext'
import { NotificationsContext } from '../../contexts/NotificationsContext'

const Signup = () => {

  // initiate context
  const { setShowSignUpForm, setShowSignInForm } = useContext(MainContext)
  const { setNotification, setShowNotification } = useContext(NotificationsContext)
  const { isLoading, setIsLoading } = useContext(LoadingContext)

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  

  const [signUpError, setSignUpError] = useState(false)
  const [signUpErrorMsg, setSignUpErrorMsg] = useState('')

  const refFullname = useRef()

  const resetForm = () => {
    setFullname('')
    setEmail('')
    setPassword('')
    setSignUpError(false)
    setSignUpErrorMsg('')
    refFullname.current.focus()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // loader on
    setIsLoading(true)
    console.log(email, fullname, password)
    // post data to /api/auth/singup
    axios.post(`/api/auth/signup`, {
      fullname, email, password
    })
    .then((response) => {
      if(response.data.message === `new user saved`){
        setNotification("You MUST verify your email before accessing the App - Please check your email")
        setShowNotification(true)
        resetForm()
        // remove loading
        setIsLoading(false)
      }
    })
    .catch((error) => { 
      if(error && error.response.data.message === "member exists"){
        setSignUpError(true)
        setSignUpErrorMsg("A member with this email already exists.")
        // remove loading
        setIsLoading(false)
      }else{ // other errors i.e. connection, stripe
        setNotification("Something went wrong, please check your connection or contact us.")
        setShowNotification(true)
        resetForm()
        // remove loading
        setIsLoading(false)
      }
    })
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setSignUpError(false)
  }
  
  return (
    <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div onClick={() => setShowSignUpForm(false)}
      className='absolute top-0 right-0 cursor-pointer z-10'>
          <CancelIcon color='error' />
      </div>
      <AnimatePresence>
        {isLoading && <Preloader loadMessage="Sign in you up..." />}
      </AnimatePresence>
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="w-full lg:w-6/12 px-4 relative">
              <h2 className="text-4xl pb-3 font-semibold">Sign Up</h2>
              <div className='absolute bottom-0.5 left-0 border-b w-full bg-gray-400'></div>
              <div className='absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-14 lg:w-16 bg-yellow-400'></div>
          </div>
          <span className="text-sm italic mt-2">
              Unlock 100s of recipes for only <strong>£1.95/mo</strong>
          </span>
        </div>
        <form onSubmit={handleSubmit}
          className="mt-8 space-y-6" 
          action="#" method="POST">
          {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
          <div className="rounded-md shadow-sm">
            <div>
              <Label labelFor="fullname" text="Fullname" />
              <Input
              className="text-lg"
              forwardedRef={refFullname} 
              value={fullname}
              handleChange={(e) => setFullname(e.target.value)}
              type="text"
              required
              placeholder="Fullname" /> 
            </div>
            <div className='mt-3'>
              <Label labelFor="email" text="Email" />
              <Input
              className={`${signUpError ? 'border border-red-500' : ''} text-lg`}
              value={email}
              handleChange={handleEmail}
              type="email"
              required
              placeholder="Email" /> 
            </div>
            {
              signUpError ? <div className='text-red-500 font-semibold text-sm'>{ signUpErrorMsg }</div> : ''
            }
            <div className='mt-3'>
              <Label labelFor="password" text="Password" />
              <Input
              className="text-lg" 
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              minLength="8"
              placeholder="Password"
              autoComplete="off" />
            </div>
          </div>
          <div>
            <Link 
            href="/auth/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account, Sign In
            </Link>
          </div>
          <div>
              <ButtonField 
              btnText="Sign Up"
              className='w-full py-2' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
