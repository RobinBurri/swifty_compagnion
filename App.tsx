import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import AppNavigationStack from './AppNavigationStack'
import { AuthContextProvider } from './store/auth-context'
import { StudentsContextProvider } from './store/student-context'

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <NavigationContainer>
                <AuthContextProvider>
                    <StudentsContextProvider>
                        <AppNavigationStack />
                    </StudentsContextProvider>
                </AuthContextProvider>
            </NavigationContainer>
        </>
    )
}
