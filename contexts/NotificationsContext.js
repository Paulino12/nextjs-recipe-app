import React, { createContext, useState } from 'react'

export const NotificationsContext = createContext()

export const NotificationsContextProvider = ({ children }) => {

    const [notification, setNotification] = useState('')
    const [showNotification, setShowNotification] = useState(false)
    const [showPricing, setShowPricing] = useState(false)

    return (
        <NotificationsContext.Provider value={{
            notification, setNotification,
            showNotification, setShowNotification,
            showPricing, setShowPricing
        }}>
            { children }
        </NotificationsContext.Provider>
    )
}
