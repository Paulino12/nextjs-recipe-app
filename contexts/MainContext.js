import { createContext, useState } from "react"

export const MainContext = createContext()

export const MainContextProvider = ({ children }) => {

    // checking session state
    const [inSession, setInSession] = useState(false)

    /*** subscriptionPlan updated in navbar useffect router dependency
    and used in members area to identify subscription changes
    and update accordingly without need to sign out ***/
    const [subscriptionPlan, setSubscriptionPlan] = useState('') 

    const [showModal, setShowModal] = useState(false) // used for *forgot password & reset password*

    // Profile
    const [newFullname, setNewFullname] = useState('')

    return <MainContext.Provider value={{
        inSession, setInSession,
        subscriptionPlan, setSubscriptionPlan,
        showModal, setShowModal,
        newFullname, setNewFullname
    }}>
        { children }
    </MainContext.Provider>
}