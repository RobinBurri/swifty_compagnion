import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import AppNavigationStack from './AppNavigationStack'

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
            
                <AppNavigationStack />
            </NavigationContainer>
        </>
    )
}

