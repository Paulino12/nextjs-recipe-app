import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { getSession, signIn } from 'next-auth/react'
import Preloader from '../../components/Preloader'

// context
import { MainContext } from '../../contexts/MainContext'

const MembersHome = () => {
    // initiate context
    const { setNotification, setShowNotification } = useContext(MainContext)

    const router = useRouter()

    // check session and redirect to sign in if not
    useEffect(() => {
        const access = async () => {
            const session = await getSession()
            if(!session){
                signIn()
            }else{
                // check if the current logged in user has a subscription plan (subscribed)
                // retrieve from session user object from next-auth
                const userId = session.user[0]
                axios.get(`/api/stripe/userSubscription/${userId}`)
                    .then((response) => {
                        console.log(`Adimin is ${response.data.userAdmin}`)
                        if(!response.data.userSubscription){
                            // redirect to cintelProducts to choose plans (standard or premium)
                            router.push(`/members/stripe/cintelProducts`)
                        }else{
                            // redirect to home page to access recipes 
                            router.push(`/`)
                        }
                    })
                    .catch((error) => {
                        if(error){
                            // show error (connection or stripe)
                            setNotification("Something went wrong, please check your connection or contact us.")
                            setShowNotification(true)
                            // redirect to signin page
                            signIn()
                        }
                    })
            }
        } 
        access()
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [])

    return (
        <div className='py-20'>
            <Preloader />
        </div>
    )
}

export default MembersHome