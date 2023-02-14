import { createContext, useState } from "react"


export const RecipesContext = createContext()

export const RecipesContextProvider = ({ children }) => {

    const [sanityRecipes, setSanityRecipes] = useState({})
    const [showSearch, setShowSearch] = useState(false)
    
    return <RecipesContext.Provider value={{
        sanityRecipes, setSanityRecipes,
        showSearch, setShowSearch
    }}>
        {children}
    </RecipesContext.Provider>
}


