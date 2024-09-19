import React, { useContext, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FilterLogins from '../components/searchUsers/FilterLogins'
import StudentList from '../components/searchUsers/StudentList'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { StudentsContext } from '../store/student-context'
import { useFilteredStudentList } from '../utils/getStudent'

export default function SearchScreen() {
    const { getAllFilteredStudents } = useFilteredStudentList()
    const studentCtx = useContext(StudentsContext)
    const [isLoadingNewStudents, setIsLoadingNewStudents] = useState(false)
    if (studentCtx.isLoading) {
        return <LoadingOverlay />
    }

    async function loadNewStudents(loginEntered: string) {
        try {
            setIsLoadingNewStudents(true)
            const studentList = await getAllFilteredStudents(loginEntered)
            if (studentList) {
                studentCtx.newSetStudents(studentList)
            }
        } catch (error) {
            Alert.alert('Error while fetching students')
        } finally {
            setIsLoadingNewStudents(false)
        }
    }

    const loadFilterLoginHandler = (loginEntered: string) => {
        console.log('Filtering by login: ', loginEntered)
        loadNewStudents(loginEntered)
    }

    return (
        <SafeAreaView style={styles.container}>
            <FilterLogins filterLoginHandler={loadFilterLoginHandler} />
            <StudentList students={studentCtx.students} />
        </SafeAreaView>
    )
    // TODO: Load more than 30 students => look at the API
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
