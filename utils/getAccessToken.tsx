import axios from 'axios'
import Constants from 'expo-constants'
import { Alert } from 'react-native'
import { API_URL } from '../constants/apiUrl'
import Token from '../models/Token'

const UID = Constants?.expoConfig?.extra?.UID
const SECRET = Constants?.expoConfig?.extra?.SECRET

const getAccessToken = async (): Promise<Token | undefined> => {
    if (!UID || !SECRET) {
        Alert.alert(
            'UID or SECRET is undefined. Check your environment variables.'
        )
        return undefined
    }

    try {
        const response = await axios.post(
            `${API_URL}/oauth/token`,
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: UID,
                client_secret: SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        return new Token(
            response.data.access_token,
            response.data.token_type,
            response.data.expires_in,
            response.data.created_at,
            response.data.scope,
            response.data.secret_valid_until
        )
    } catch (error) {
        Alert.alert('Failed to get access token. Check your credentials.')
        return undefined
    }
}

export default getAccessToken
