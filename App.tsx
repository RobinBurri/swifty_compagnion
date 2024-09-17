import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import AppNavigationStack from './AppNavigationStack'
import { AuthContextProvider } from './store/auth-context'

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <AuthContextProvider>
                    <AppNavigationStack />
                </AuthContextProvider>
            </NavigationContainer>
        </>
    )
}
