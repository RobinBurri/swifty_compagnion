import { RouteProp } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import { getStudentById } from '../utils/getStudent'

type RootStackParamList = {
    Detail: { studentId: number }
}

interface DetailScreenProps {
    route: RouteProp<RootStackParamList, 'Detail'>
}

export default function DetailScreen({ route }: DetailScreenProps) {
    const studentId = route.params?.studentId
    const [studentData, setStudentData] = useState<any>(null)

    useEffect(() => {
        async function loadStudentDate() {
            const studentData = await getStudentById(studentId)
            setStudentData(studentData)
        }

        if (studentId) {
            loadStudentDate()
            console.log("studentData\n", studentData)
        }
    }, [])

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
