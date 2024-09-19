import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FilterLogins from '../components/searchUsers/FilterLogins'
import StudentList from '../components/searchUsers/StudentList'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { StudentsContext } from '../store/student-context'

export default function SearchScreen() {
    const studentCtx = useContext(StudentsContext)
    if (studentCtx.isLoading) {
        return <LoadingOverlay />
    }
    const loadFilterLoginHandler = (loginEntered: string) => { 
        console.log('Filtering by login: ', loginEntered)
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
