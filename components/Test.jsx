import React, { useContext } from 'react'
import { RecipesContext } from '../context/RecipesContext'

const Test = () => {

    const items = useContext(RecipesContext)

    console.log(items)

    return (
        <div className='pt-16'>Test</div>
    )
}

export default Test