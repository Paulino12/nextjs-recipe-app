import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import axios from 'axios'
import ButtonField from '../forms/ButtonField'
import Input from '../forms/Input'
import { NotificationsContext } from '../../contexts/NotificationsContext'
import Preloader from '../Preloader'

const VerifyEmail = ({ emailVerificationToken, csrfToken }) => {

    const {
        setNotification, setShowNotification
    } = useContext(NotificationsContext)

    const [loadVerifyEmail, setLoadVerifyEmail] = useState(true)
    const [isVerified, setIsVerified] = useState(false)
    const [email, setEmail] = useState('')
    const [isAlreadyVerified, setIsAlreadyVerified] = useState(false)
    const [expiredLinkNote, setExpiredLinkNote] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if(!emailVerificationToken) {
            return
        }else{
            axios.get(`/api/auth/verifyEmailToken/${emailVerificationToken}`, {})
                .then((response) => {
                    if(response.data.message === "user already verified"){
                        setIsAlreadyVerified(true)
                        setLoadVerifyEmail(false)
                        return
                    }
                    if(response.data.error === 'jwt expired') {
                        setEmail(response.data.email)
                        setLoadVerifyEmail(false)
                        return
                    }
                    if(response.data.message === 'verified'){
                        setIsVerified(true)
                        setLoadVerifyEmail(false)
                    }else{
                        setIsVerified(false)
                        setLoadVerifyEmail(false)
                    }
                })
                .catch((error) => { 
                    if(error){
                        setIsError(true)
                        setLoadVerifyEmail(false)
                    }
                 })
        }
    }, [emailVerificationToken])

    const handleVerifyEmail = (e) => {
        e.preventDefault()
        setLoadVerifyEmail(true)
        axios.post('/api/auth/reVerifyEmail', { email })
            .then((response) => {
                if(response.data.message === "new email sent"){
                    setNotification("A new verification link with 1 hour expiration was sent to your email")
                    setShowNotification(true)
                    // reset form and expired link note
                    setExpiredLinkNote(false)
                    setEmail('')
                    setLoadVerifyEmail(false)
                }
            })
            .catch((error) => { 
                if(error){
                    setIsError(true)
                    setLoadVerifyEmail(false)
                }
             })
    }

    return (
        <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            <AnimatePresence>
                {loadVerifyEmail && <Preloader />}
            </AnimatePresence>
            {
                isError ?
                <div className="mt-6 text-center text-3xl font-extrabold text-red-900">
                    Something went wrong. Please check your connection and verify your email again. 
                    <br />
                    Thank you.
                </div>
                :
                <div className="max-w-md w-full space-y-8">
                    {
                        isAlreadyVerified ?
                        <div className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            You are already a verified member, you may now <br />
                            <Link 
                            href="/auth/signin"
                            className="text-indigo-600 hover:text-indigo-500">
                                sign in...
                            </Link>
                        </div>
                        :
                        !isVerified ?
                        <div>
                            <div className="flex flex-col items-center justify-center text-center mb-12">
                                <div className="w-full px-4 relative">
                                    <h2 className="text-4xl pb-3 font-semibold">Verify Email</h2>
                                    <div className='absolute bottom-0.5 left-0 border-b w-full bg-gray-400'></div>
                                    <div className='absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-14 lg:w-16 bg-yellow-400'></div>
                                </div>
                                <span className="text-sm italic mt-2">
                                    Get a verification link
                                </span>
                            </div>
                            {
                                expiredLinkNote &&
                                <div className="flex justify-center bg-red-100 rounded-lg py-3 px-3 text-base text-red-700 my-3 capitalize" role="alert">
                                    <p>
                                        Expired Link, click below to receive a new one
                                    </p>
                                </div>
                            }
                            {
                                expiredLinkNote ?
                                <form onSubmit={handleVerifyEmail}
                                className="mt-5 space-y-6" action="#" method="POST">
                                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                                    <Input className='w-full text-lg'
                                    value={email}
                                    disabled />
                                    <div>
                                        <ButtonField 
                                        btnText="Send Link"
                                        className='w-full py-2' />
                                    </div>
                                </form>
                                :
                                <div className="flex justify-center bg-green-100 rounded-lg py-3 px-3 text-base text-green-700 my-3 capitalize" role="alert">
                                    <p>
                                        A new verification link with 1 hour expiration was sent to your email
                                    </p>
                                </div>
                            }
                            
                        </div>
                        :
                        <div className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Thanks for verifying your email, you may now <br />
                            <Link 
                            href="/auth/signin"
                            className="text-indigo-600 hover:text-indigo-500">
                                sign in...
                            </Link>
                        </div>
                    }
                </div>  
            }    
        </div>
    )
}

export default VerifyEmail
