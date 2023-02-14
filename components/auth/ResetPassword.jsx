import React, { useState, useEffect, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import Label from '../forms/Label'
import Input from '../forms/Input'
import ButtonField from '../forms/ButtonField'
import axios from 'axios'
import { useRouter } from 'next/router'
import { MainContext } from '../../contexts/MainContext'
import Preloader from '../Preloader'

const ResetPassword = ({ csrfToken, resetpasswordtoken}) => {

    const router = useRouter()

    const [loadVerifyEmail, setLoadVerifyEmail] = useState(true)
    const [loadMessage, setloadMessage] = useState('')
    const [validToken, setValidToken] = useState(false)
    const [expiredLinkNote, setExpiredLinkNote] = useState(true)
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validatePassword, setvalidatePassword] = useState('')

    useEffect(() => {
        if(!resetpasswordtoken){
            return
        }else{
            axios.get(`/api/auth/resetPasswordToken/${resetpasswordtoken}`)
                .then((response) => {
                    console.log(response.data)
                    if(response.data.message === "jwt expired"){
                        setEmail(response.data.email)
                        setLoadVerifyEmail(false)
                    }else{
                        setEmail(response.data.email)
                        setValidToken(true)
                        setLoadVerifyEmail(false)
                    }
                })
                .catch((error) => { console.log(error) })
        }
    }, [resetpasswordtoken])

    const handleValidTokenEmail = (e) => {
        e.preventDefault()
        setLoadVerifyEmail(true)
        axios.post('/api/auth/forgotPassword', { email })
            .then((response) => {
                console.log(response.data)
                if(response.data.message === 'jwt expired'){
                    return
                }else{
                    setTimeout(() => {
                        setloadMessage(response.data)
                    }, 2000);
                    setTimeout(() => {
                        router.push('/auth/signin')
                    }, 4000);
                }
            })
            .catch((error) => { console.log(error) })
    }

    const handleResetPassword = (e) => {
        e.preventDefault()
        if(confirmPassword !== newPassword){
            // validation passwords not matching
            setvalidatePassword('Passwords not mactching')
            return
        }else{
            // reset password
            setLoadVerifyEmail(true)
            axios.put(`/api/auth/forgotPassword`, { email, newPassword })
                .then((response) => {
                    setTimeout(() => {
                        setloadMessage(response.data.message)
                    }, 3000);
                    setTimeout(() => {
                        router.push('/auth/signin')
                    }, 8000);
                })
                .catch((error) => { console.log(error) })
        }
    }

    return (
        <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <AnimatePresence>
                {loadVerifyEmail && <Preloader loadMessage={loadMessage} />}
            </AnimatePresence>
            {
                !validToken ?
                <div>
                    {/* send another link */}
                    <>
                        <div className="flex flex-col items-center justify-center text-center mb-12">
                            <div className="w-full px-4 relative">
                                <h2 className="text-4xl pb-3 font-semibold">Reset Password</h2>
                                <div className='absolute bottom-0.5 left-0 border-b w-full bg-gray-400'></div>
                                <div className='absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-14 lg:w-16 bg-yellow-400'></div>
                            </div>
                            <span className="text-sm italic mt-2">
                                Update your password below
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
                        
                        <form onSubmit={handleValidTokenEmail}
                        className="mt-5 space-y-6" action="#" method="POST">
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <Input className='w-full'
                            value={email}
                            handleChange={(e) => setEmail(e.target.value)}
                            disabled />
                            <div>
                                <ButtonField 
                                btnText="Send New Link"
                                className='w-full py-2' />
                            </div>
                        </form> 
                    </>
                </div>
                :
                <div className='max-w-md w-full'>
                    {/* reset password */}
                    <div className="flex flex-col items-center justify-center text-center mb-12">
                        <div className="w-full px-4 relative">
                            <h2 className="text-4xl pb-3 font-semibold">Reset Password</h2>
                            <div className='absolute bottom-0.5 left-0 border-b w-full bg-gray-400'></div>
                            <div className='absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-14 lg:w-16 bg-yellow-400'></div>
                        </div>
                        <span className="text-sm italic mt-2">
                            Update your password below
                        </span>
                    </div>
                    
                    <form onSubmit={handleResetPassword}
                    className="mt-5 space-y-6" action="#" method="POST">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div>
                            <Label labelFor="newPassword" text="New Password" />
                            <Input className='w-full'
                            type="password"
                            value={newPassword}
                            handleChange={(e) => {
                                setNewPassword(e.target.value)
                                setvalidatePassword('')
                            }}
                             />
                        </div>
                        <div>
                            <Label labelFor="confirmPassword" text="Confirm Password" />
                            <Input className={`w-full ${validatePassword !== '' ? 'border-red-400' : ''}`}
                            type="password"
                            value={confirmPassword}
                            handleChange={(e) => {
                                setConfirmPassword(e.target.value)
                                setvalidatePassword('')
                            }}
                             />
                        </div>
                        <span className='text-red-500 font-semibold text-sm'>{validatePassword}</span>
                        
                        <div>
                            <ButtonField 
                            btnText="Submit"
                            className='w-full py-2' />
                        </div>
                    </form> 
                </div>
            }
        </div>
    )
}

export default ResetPassword
