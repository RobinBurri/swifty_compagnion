import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'

export default function DetailScreen() {


    return (
        <View style={styles.container}>
            <Text>Detail Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.lightGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
