import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { MainContext } from '../../../../contexts/MainContext'

const SubscriptionSessionSuccess = () => {
    // initiate context
    const { setIsLoading } = useContext(MainContext)
    
    const router = useRouter()

    const { subscriptionSessionSuccess } = router.query

    useEffect(() => {
        const access = async () => {
            const session = await getSession()
            if(!session){ return signIn() }
            if(!subscriptionSessionSuccess) return
            // update mongoDB and redirect to dashboard
            const userId = session.user[0]
            const productPrice = subscriptionSessionSuccess[1]
            axios.put(`/api/stripe/userSubscription/${userId}`, { productPrice })
                .then((response) => {
                    console.log(response.data)
                    if(response.data === "subscription plan updated"){
                        setIsLoading(true)
                        router.push('/members')
                    }else{
                        router.push('/auth/signin')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            console.log(subscriptionSessionSuccess[1], session)
            // loader off
        }

        access()
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [subscriptionSessionSuccess])

    return (
        <div>SubscriptionSessionSuccess</div>
    )
}

export default SubscriptionSessionSuccess