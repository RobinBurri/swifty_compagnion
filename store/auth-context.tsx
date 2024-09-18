import React, { createContext, ReactNode, useEffect, useState } from 'react'
import getAccessToken from '../utils/getAccessToken'

type AuthContextType = {
    token: string | undefined
    setToken: (token: string) => void
    getToken: () => string | undefined
    isLoading: boolean
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [authToken, setAuthToken] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function loadToken() {
          try {
            const token = await getAccessToken();
            if (token) {
              setAuthToken(token);
              console.log("Token: ", token);
            }
          } catch (error) {
            console.error('Failed to load access token:', error);
          } finally {
            setIsLoading(false);
          }
        }
        loadToken();
      }, []);

    const value = {
        token: authToken,
        setToken: (token: string) => setAuthToken(token),
        getToken: () => authToken,
        isLoading,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
