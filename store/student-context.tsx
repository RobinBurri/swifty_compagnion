import React, { createContext, ReactNode, useEffect, useState } from 'react'
import getAccessToken from '../utils/getAccessToken'

type AuthContextType = {
    token: string | undefined
    setToken: (token: string) => void
    getToken: () => string | undefined
}

type AuthContextProviderProps = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [authToken, setAuthToken] = useState<string | undefined>(undefined)
    useEffect(() => {
        async function loadToken() {
            const token = await getAccessToken()
            if (token) {
                setAuthToken(token)
            }
        }
        loadToken()
    }, [])

    const value = {
        token: authToken,
        setToken: (token: string) => setAuthToken(token),
        getToken: () => authToken,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
