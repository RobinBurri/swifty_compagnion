import { RouteProp } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native'
import ButtonSelection, {
    btnType,
} from '../components/detailUser/ButtonSelection'
import LevelAndPoints from '../components/detailUser/LevelAndPoints'
import PictureAndName from '../components/detailUser/PictureAndName'
import ProjectList from '../components/detailUser/ProjectList'
import SkillList from '../components/detailUser/SkillList'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { GlobalStyles } from '../constants/styles'
import FullStudent from '../models/Student'
import { useStudentById } from '../utils/useStudentById'

type RootStackParamList = {
    Detail: { studentId: number }
}

interface DetailScreenProps {
    route: RouteProp<RootStackParamList, 'Detail'>
}

export default function DetailScreen({ route }: DetailScreenProps) {
    const studentId = route.params?.studentId
    const { getStudentById } = useStudentById()
    const [studentData, setStudentData] = useState<FullStudent | null>(null)
    const [infoShown, setInfoShown] = useState<btnType>(btnType.projects)

    useEffect(() => {
        async function loadStudentDate() {
            try {
                const student = await getStudentById(studentId)
                setStudentData(student)
            } catch (error: any) {
                Alert.alert(error.message, 'Please go back and try again.', [
                    { text: 'OK' },
                ])
            }
        }
        loadStudentDate()
    }, [])

    const btnPressedHandler = (type: btnType) => {
        type === btnType.projects
            ? setInfoShown(btnType.projects)
            : setInfoShown(btnType.skills)
    }

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
                <ButtonSelection btnPressedHandler={btnPressedHandler} />
                {infoShown === btnType.projects && (
                    <ProjectList studentData={studentData} />
                )}
                {infoShown === btnType.skills && (
                    <SkillList studentData={studentData} />
                )}
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
        flex: 1,
        backgroundColor: GlobalStyles.colors.beige,
        borderRadius: 10,
        padding: 20,
        margin: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: GlobalStyles.colors.darkBrown,
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
})
