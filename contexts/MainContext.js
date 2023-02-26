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

    // Notifications
    const [notification, setNotification] = useState('')
    const [showNotification, setShowNotification] = useState(false)
    const [showPricing, setShowPricing] = useState(false)

    // loading
    const [isLoading, setIsLoading ] = useState(false)
    const [noSessionLoading, setNoSessionLoading] = useState(false)

    // recipes
    const [sanityRecipes, setSanityRecipes] = useState({})
    const [showSearch, setShowSearch] = useState(false)

    return <MainContext.Provider value={{
        inSession, setInSession,
        subscriptionPlan, setSubscriptionPlan,
        showModal, setShowModal,
        newFullname, setNewFullname,
        notification, setNotification,
        showNotification, setShowNotification,
        showPricing, setShowPricing,
        isLoading, setIsLoading,
        noSessionLoading, setNoSessionLoading,
        sanityRecipes, setSanityRecipes,
        showSearch, setShowSearch
    }}>
        { children }
    </MainContext.Provider>
}