import React, { useContext, useEffect } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { NotificationsContext } from '../contexts/NotificationsContext'

function Notification() {

    // Initiate notification context
    const {
        notification, setShowNotification
    } = useContext(NotificationsContext)

    useEffect(() => {
        setTimeout(() => {
            setShowNotification(false)
        }, 3000)
    }, [notification, setShowNotification])

    return (
        <div className={`${notification.includes('wrong') ? 'bg-red-200 text-red-800':'bg-green-200 text-green-800'}
        p-3 w-full h-1/2
        rounded-sm shadow-md flex items-center justify-between font-semibold text-xl`}>
            <h1 className='text-sm'>{notification}</h1>
            <div onClick={() => setShowNotification(false)} className='cursor-pointer flex items-center'>
                <CancelIcon color='error' />
            </div>
        </div>
    )
}

export default Notification
