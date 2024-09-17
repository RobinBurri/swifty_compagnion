import { RouteProp } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import { useStudentById } from '../utils/getStudent'


type RootStackParamList = {
    Detail: { studentLogin: string }
}

interface DetailScreenProps {
    route: RouteProp<RootStackParamList, 'Detail'>
}

export default function DetailScreen({ route }: DetailScreenProps) {
    const studentLogin = route.params?.studentLogin
    const [studentData, setStudentData] = useState<any>(null)
    const { getStudentById } = useStudentById()

    useEffect(() => {
        async function loadStudentDate() {
            const studentData = await getStudentById(studentLogin)
            setStudentData(studentData)
        }

        if (studentLogin) {
            loadStudentDate()
            console.log("studentData\n", studentData)
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text>Detail Screen</Text>
            <Text>student login : {studentLogin}</Text>
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
