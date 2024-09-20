import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FilterLogins from '../components/searchUsers/FilterLogins'
import StudentList from '../components/searchUsers/StudentList'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { StudentsContext } from '../store/student-context'
import { useFilteredStudentList } from '../utils/useFilteredStudentList'

export default function SearchScreen() {
    const { getAllFilteredStudents } = useFilteredStudentList()
    const studentCtx = useContext(StudentsContext)
    const [isLoadingNewStudents, setIsLoadingNewStudents] = useState(false)
    const [lastSearch, setLastSearch] = useState('')

    async function loadNewStudents(loginEntered: string) {
        setIsLoadingNewStudents(true)
        const studentList = await getAllFilteredStudents(loginEntered)
        if (studentList) {
            studentCtx.newSetStudents(studentList)
        }
        setIsLoadingNewStudents(false)
    }

    const loadFilterLoginHandler = (loginEntered: string) => {
        setLastSearch(loginEntered)
        loadNewStudents(loginEntered)
    }

    if (isLoadingNewStudents) {
        return (
            <SafeAreaView style={styles.container}>
                <LoadingOverlay />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FilterLogins filterLoginHandler={loadFilterLoginHandler} />
            <StudentList students={studentCtx.students} lastSearch={lastSearch} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
