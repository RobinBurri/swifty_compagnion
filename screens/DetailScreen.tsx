import { RouteProp } from '@react-navigation/native'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../constants/styles'

type RootStackParamList = {
    Detail: { studentId: number}
}

interface DetailScreenProps {
    route: RouteProp<RootStackParamList, 'Detail'>
}

export default function DetailScreen({route}: DetailScreenProps) {
    const studentId = route.params?.studentId

    return (

        <SafeAreaView style={styles.container}>
            <Text>Detail Screen</Text>
            <Text>student id : {studentId}</Text>
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
