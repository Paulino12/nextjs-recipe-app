import React, { useContext } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { NotificationsContext } from '../contexts/NotificationsContext'
import Link from 'next/link'
import ButtonField from './forms/ButtonField'
import CheckIcon from '@mui/icons-material/Check'

const Pricing = () => {

    const { setShowPricing } = useContext(NotificationsContext)

    return (
        <div className="bg-white flex flex-col h-full w-full shadow-lg rounded-lg relative">
            <div className='flex flex-col px-5 text-center mb-1'>
                <div className='w-full mt-6 mb-3 py-1 font-bold uppercase rounded-xl bg-yellow-400 text-yellow-800'>Only one plan</div>
                <div className='inline-block'>
                    <span className='text-6xl font-bold'>£1.95</span>/mo
                </div>
                <p className='italic'>Unlock lots of recipes</p>
            </div>
            <div className='h-full bg-gray-100 py-3 px-5 flex items-center justify-center'>
                <ul className="mt-3 text-sm">
                    <li className='list-none'>
                        <CheckIcon fontSize='medium' color='success' />
                        <strong>7 days free trial.</strong>
                    </li>
                    <li className='list-none'>
                        <CheckIcon fontSize='medium' color='success' />Access all recipes.
                    </li>
                    <li className='list-none'>
                        <CheckIcon fontSize='medium' color='success' />Nutritional analysis of recipes.
                    </li>
                    <li className='list-none'>
                        <CheckIcon fontSize='medium' color='success' />No contracts, cancel anytime.
                    </li>
                </ul>
            </div>
            <div className='w-3/4 mx-auto py-3'>
                <Link 
                onClick={() => setShowPricing(false)}
                href="/auth/signup">
                    <ButtonField btnText="Get Started" className="w-full h-full py-2" />
                </Link>
            </div>
            <div onClick={() => setShowPricing(false)} className='cursor-pointer flex items-center absolute top-0 right-0'>
                <CancelIcon color='error' />
            </div>
        </div>
    )
}

export default Pricing
