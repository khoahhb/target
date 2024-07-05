import React, { createContext, useState, useContext } from 'react'

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export { LoadingContext, LoadingProvider }
