import React, { useState, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import axios from 'axios'
import CancelIcon from '@mui/icons-material/Cancel'
import Input from '../forms/Input'
import ButtonField from '../forms/ButtonField'
import { MainContext } from '../../contexts/MainContext'
import { NotificationsContext } from '../../contexts/NotificationsContext'
import Preloader from '../Preloader'

const ForgotPassword = ({ csrfToken }) => {

    const {
        setShowModal, setNotification, setShowNotification
    } = useContext(MainContext)

    // const {
    //     setNotification, setShowNotification
    // } = useContext(NotificationsContext)

    const [forgotPassLoad, setForgotPassLoad] = useState(false)
    const [email, setEmail] = useState('')

    const handleResetPassword = (e) => {
        setForgotPassLoad(true)
        e.preventDefault()
        axios.post('/api/auth/forgotPassword', { email })
            .then((response) => {
                setForgotPassLoad(false)
                setShowModal(false)
                setNotification(response.data)
                setShowNotification(true)
            })
            .catch((error) => { console.log(error) })
    }

    return (
        <div className="max-w-md w-full space-y-8 bg-white h-2/3 flex items-center rounded-md px-2 relative">
            <AnimatePresence>
                {forgotPassLoad && <Preloader />}
            </AnimatePresence>
            <div onClick={() => setShowModal(false)}
            className='absolute top-0 right-0 cursor-pointer'>
                <CancelIcon color='error' />
            </div>
            <div className='w-full'>
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-full lg:w-6/12 px-4 relative">
                        <h2 className="text-2xl pb-3 font-semibold">Reset Password</h2>
                        <div className='absolute bottom-0.5 left-0 border-b w-full bg-gray-400'></div>
                        <div className='absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-14 lg:w-16 bg-yellow-400'></div>
                    </div>
                    <span className="text-sm italic mt-2">
                        Please provide your email below
                    </span>
                </div>
                
                <form onSubmit={handleResetPassword}
                className="mt-5 space-y-6" action="#" method="POST">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <Input className='w-full text-lg'
                    type="email"
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    />
                    <div>
                        <ButtonField 
                        btnText="Send Email"
                        className='w-full py-2' />
                    </div>
                </form> 
            </div>
        </div>
    )
}

export default ForgotPassword
