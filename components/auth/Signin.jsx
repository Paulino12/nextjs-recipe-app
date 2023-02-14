import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Label from '../forms/Label'
import Input from '../forms/Input'
import ButtonField from '../forms/ButtonField'
import ForgotPassword from './ForgotPassword'

import { useRouter } from "next/router"
import { signIn } from 'next-auth/react'

// context
import { MainContext } from '../../contexts/MainContext'
import { LoadingContext } from '../../contexts/LoadingContext'

const Signin = ({ csrfToken }) => {

    // initiate context
    const { showModal, setShowModal } = useContext(MainContext)
    const { isLoading, setIsLoading } = useContext(LoadingContext)

    const { error } = useRouter().query

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        signIn("credentials", {
            username: username, password: password, callbackUrl: "/members"
        })
    }

    return (
        <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <AnimatePresence>
                {
                    showModal &&
                    <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        ease: "easeInOut"
                    }}
                    className='absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-20'
                    layoutId={showModal}>
                        <ForgotPassword csrfToken={csrfToken} />
                    </motion.div>
                }
            </AnimatePresence>
            <div className="max-w-md w-full space-y-8">
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <div className="w-full lg:w-6/12 px-4 relative">
                        <h2 className="text-4xl pb-3 font-semibold">Sign In</h2>
                        <div className='absolute bottom-0.5 left-0 border-b w-full bg-gray-400'></div>
                        <div className='absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-14 lg:w-16 bg-yellow-400'></div>
                    </div>
                    <span className="text-sm italic mt-2">
                        Enter your details below to access your account
                    </span>
                </div>
                {
                    error &&
                    <div className="flex justify-center bg-red-100 rounded-lg py-3 px-3 text-base text-red-700 mb-3 capitalize" role="alert">
                        {error}
                    </div>
                }
                <form onSubmit={handleSubmit}
                className="mt-8 space-y-6">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <div className="rounded-md shadow-sm space-y-3">
                        <div className='mb-3'>
                            <Label labelFor="email" text="Email" />
                            <Input
                            className="text-sm" 
                            inputName="username"
                            inputLabel="Email Address "
                            value={username}
                            handleChange={(e) => setUsername(e.target.value)}
                            type="email"
                            required
                            placeholder="Email" /> 
                        </div>
                        <div>
                            <Label labelFor="password" text="Password" />
                            <Input
                            className="text-sm" 
                            inputName="password"
                            inputLabel="password"
                            value={password}
                            handleChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                            placeholder="Password"
                            autoComplete="off" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" 
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <motion.div>
                            <motion.a 
                            onClick={() => setShowModal(true)} layoutId={showModal}
                            href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </motion.a>
                        </motion.div>
                    </div>

                    <div>
                        <ButtonField btnText="Sign In" className="w-full py-2" />
                    </div>
                    <div className="flex items-start">
                        <Link 
                        href="/auth/signup"
                        className="font-medium text-indigo-600 hover:text-indigo-500">
                            Not have an account, Sing Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
      
    )
}

export default Signin
