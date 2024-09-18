import { RouteProp } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import LevelAndPoints from '../components/detailUser/LevelAndPoints'
import PictureAndName from '../components/detailUser/PictureAndName'
import ProjectList from '../components/detailUser/ProjectList'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { GlobalStyles } from '../constants/styles'
import FullStudent from '../models/Student'
import { useStudentById } from '../utils/getStudent'

type RootStackParamList = {
    Detail: { studentId: number }
}

interface DetailScreenProps {
    route: RouteProp<RootStackParamList, 'Detail'>
}

export default function DetailScreen({ route }: DetailScreenProps) {
    const studentId = route.params?.studentId
    const [studentData, setStudentData] = useState<FullStudent | null>(null)
    const { getStudentById } = useStudentById()

    useEffect(() => {
        async function loadStudentDate() {
            const student = await getStudentById(studentId)
            if (student) {
                setStudentData(student)
            }
        }
        if (studentId) {
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
                <LevelAndPoints studentData={studentData} />
                <ProjectList studentData={studentData} />
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
