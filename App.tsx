import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import AppNavigationStack from './AppNavigationStack'

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
              // Add context provider here
                <AppNavigationStack />
            </NavigationContainer>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
