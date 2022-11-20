
import React, { useState, useEffect } from 'react'

export default function useDebounce(actualQuery, delay) {

    const [debouncedQuery, setDebouncedQuery] = useState(actualQuery)

    useEffect(() => {

        const debounceAction = setTimeout(() => {
            setDebouncedQuery(actualQuery)
        }, delay);

        return () => {
            clearTimeout(debounceAction);
          };
        
    }, [actualQuery])
    
    return debouncedQuery
}

