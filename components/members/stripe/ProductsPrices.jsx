import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { MainContext } from '../../../contexts/MainContext'
import Preloader from '../../Preloader'
 
const ProductsPrices = () => {
  // initiate context
  const { 
    isLoading, setIsLoading,
    setNotification, setShowNotification
   } = useContext(MainContext)

  const router = useRouter()

  // Development price or Stripe test mode price
  const standardProductPrice = "price_1MY5X9HQlT2vrwxYO5BjCy0z"
  
  // Production price
  // const standardProductPrice = "price_1MbVWpHQlT2vrwxY6bZx9oEJ"

  // new useState session variable to allow redirect to dashboard after subscription
  // without the need to signout first.
  const [sessionData, setSessionData] = useState(null)
  
  useEffect(() => {
    const access = async () => {
      const session = await getSession()
      if(!session){ return signIn() }
      setSessionData(session)
    }
    access()
    // loader off
    setIsLoading(false)
    // Line below removes useeffect warning about adding dependency
    // eslint-disable-next-line
  }, [])

  const handleProduct = (product) => {
    setIsLoading(true)
    axios.get(`/api/stripe/createSubscriptionSession/${product}/${sessionData.user[2]}`)
      .then((response) => {
        // redirect to stripe url to enter credit cards details
        const stripeUrl = response.data
        router.push(stripeUrl)
      })
      .catch((error) => {
        if(error){
          // show error (connection or stripe)
          setNotification("Something went wrong, please check your connection or contact us.")
          setShowNotification(true)
          // loader off
          setIsLoading(false)
        }
      })
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <div className="w-full flex flex-col items-center justify-center text-center mb-12">
        <div className="w-full lg:w-6/12 px-4 relative">
            <h2 className="text-4xl pb-3 font-semibold">Subscription Plan</h2>
            <div className='absolute bottom-0.5 left-0 border-b w-full bg-gray-400'></div>
            <div className='absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-14 lg:w-16 bg-yellow-400'></div>
        </div>
        <span className="text-sm italic mt-2">
            Please select the subcription plan below
        </span>
      </div>
      <div className="w-full md:w-1/2 md:mx-auto h-full flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 items-center md:items-start justify-center">
        <div  onClick={() => handleProduct(standardProductPrice)}
        className='flex flex-col items-start py-2 px-5 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hoverCardEffect active:scale-95'>
          <div className='my-6 py-1 px-2 font-semibold uppercase rounded-xl bg-yellow-400 text-yellow-800'>Octav Recipes Standard</div>
          <div className='inline-block'>
              <span className='text-6xl font-bold'>£1.95</span>/mo
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPrices