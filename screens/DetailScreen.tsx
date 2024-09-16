import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../constants/styles'

export default function DetailScreen() {


    return (

        <SafeAreaView style={styles.container}>
            <Text>Detail Screen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.lightGreen,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
})
