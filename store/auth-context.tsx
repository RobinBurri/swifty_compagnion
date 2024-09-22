import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { Alert } from 'react-native'
import { LOG_TOKEN } from '../constants/tokenLog'
import Token from '../models/Token'
import getAccessToken from '../utils/getAccessToken'

type AuthContextType = {
    token: Token
    setToken: (token: Token) => void
    getToken: () => Token
    isLoading: boolean
    isError: boolean
    retryAuth: () => Promise<void>
}

type AuthContextProviderProps = {
    children: ReactNode
}

const placeholderToken = new Token('placeholder', 3, Date.now())

const defaultAuthContext: AuthContextType = {
    token: placeholderToken,
    setToken: () => {},
    getToken: () => placeholderToken,
    isLoading: false,
    isError: false,
    retryAuth: async () => Promise.resolve(),
}

export const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [authToken, setAuthToken] = useState<Token>(placeholderToken)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const loadToken = useCallback(async () => {
        setIsLoading(true)
        setIsError(false)
        try {
            const token = await getAccessToken()
            if (token) {
                setAuthToken(token)
                if (LOG_TOKEN) {
                    console.log('Token loaded:', token.getToken())
                    console.log('Token expires in:', token.getExpiresIn())
                    console.log('Token created at:', token.getCreatedAt())
                }
            } else {
                throw new Error('Failed to get access token')
            }
        } catch (error: any) {
            setIsError(true)
            Alert.alert('Authentication Error', error.message, [{ text: 'OK' }])
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadToken()
    }, [loadToken])

    // Check if the token is expiring soon and refresh it
    useEffect(() => {
        const refreshToken = async () => {
            if (authToken && authToken.isTokenExpiringSoon()) {
                try {
                    const token = await getAccessToken()
                    if (token) {
                        setAuthToken(token)
                        if (LOG_TOKEN) {
                            console.log('Token refreshed:', token.getToken())
                        }
                    } else {
                        Alert.alert('Error refreshing token', 'Try again', [
                            { text: 'OK' },
                        ])
                    }
                } catch (error) {
                    console.error('Error refreshing token:', error)
                    setIsError(true)
                    Alert.alert(
                        'Authentication Error',
                        'Failed to refresh the access token. Please try to authenticate again.',
                        [{ text: 'OK', onPress: async () => retryAuth }]
                    )
                }
            }
        }

        const startTokenCheckInterval = () => {
            if (authToken) {
                intervalRef.current = setInterval(() => {
                    refreshToken()
                }, 5000)
            }
        }

        if (!isLoading && !isError) {
            startTokenCheckInterval()
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [authToken, isLoading, isError])

    const retryAuth = useCallback(async () => {
        await loadToken()
    }, [loadToken])

    const value = {
        token: authToken,
        setToken: (token: Token) => setAuthToken(token),
        getToken: () => authToken,
        isLoading,
        isError,
        retryAuth,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
