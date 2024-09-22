import axios from 'axios'
import Constants from 'expo-constants'
import { API_URL } from '../constants/apiUrl'
import Token from '../models/Token'

const UID = Constants?.expoConfig?.extra?.UID
const SECRET = Constants?.expoConfig?.extra?.SECRET

const getAccessToken = async (): Promise<Token | undefined> => {
    if (!UID || !SECRET) {
       throw new Error('UID or SECRET not found, please check your environment variables')
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
            response.data.expires_in,
            response.data.created_at,
        )
    } catch (error) {
       throw new Error('Failed to get access token')
    }
}

export default getAccessToken
