import { RouteProp } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import PictureAndName from '../components/detailUser/PictureAndName'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { GlobalStyles } from '../constants/styles'
import FullStudent from '../models/FullStudent'
import { useStudentById } from '../utils/getStudent'

type RootStackParamList = {
    Detail: { studentLogin: string }
}

interface DetailScreenProps {
    route: RouteProp<RootStackParamList, 'Detail'>
}

export default function DetailScreen({ route }: DetailScreenProps) {
    const studentLogin = route.params?.studentLogin
    const [studentData, setStudentData] = useState<FullStudent | null>(null)
    const { getStudentById } = useStudentById()

    useEffect(() => {
        async function loadStudentDate() {
            const student = await getStudentById(studentLogin)
            if (student) {
                setStudentData(student)
            }
        }
        if (studentLogin) {
            loadStudentDate()
        }
    }, [])

    if (!studentData) {
        return (
            <SafeAreaView style={styles.container}>
                <LoadingOverlay />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <PictureAndName studentData={studentData} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.lightGreen,
        marginTop: 20,
    },
    card: {
        backgroundColor: GlobalStyles.colors.beige,
        borderRadius: 10,
        padding: 20,
        margin: 20,
        alignItems: 'center',
    },
})
