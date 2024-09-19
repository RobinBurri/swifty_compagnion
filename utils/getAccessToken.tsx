import axios from 'axios'
import Constants from 'expo-constants'
import { Alert } from 'react-native'
import { API_URL } from '../constants/apiUrl'

const UID = Constants?.expoConfig?.extra?.UID
const SECRET = Constants?.expoConfig?.extra?.SECRET

const getAccessToken = async (): Promise<string | undefined> => {
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
        console.log(response.data)
        const { access_token } = response.data
        return access_token
    } catch (error) {
        Alert.alert('Failed to get access token. Check your credentials.')
        return undefined
    }
}

export default getAccessToken
