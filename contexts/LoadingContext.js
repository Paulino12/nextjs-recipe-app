import React, { useState, createContext } from 'react'

export const LoadingContext = createContext()

export const LoadingContextProvider = ({ children }) => {
    const [isLoading, setIsLoading ] = useState(false)
    const [noSessionLoading, setNoSessionLoading] = useState(false)
    return (
        <LoadingContext.Provider value={{
            isLoading, setIsLoading,
            noSessionLoading, setNoSessionLoading
        }} >
            { children }
        </LoadingContext.Provider>
    )
}
