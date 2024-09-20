import { useContext } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import BasicStudent from '../../models/BasicStudent'
import { StudentsContext } from '../../store/student-context'
import StudentItem from './StudentItem'

interface StudentListProps {
    students: BasicStudent[]
    lastSearch: string
}

export default function StudentList({ students, lastSearch }: StudentListProps) {
    const studentCtx = useContext(StudentsContext)
    const renderUser = ({ item }: { item: BasicStudent }) => {
        return <StudentItem student={item} />
    }

    if (studentCtx.hasSearched && studentCtx.students.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                    <Text style={styles.errorMsg}>
                        No students found with login starting with:
                    </Text>
                    <Text style={styles.errorMsg}>{lastSearch}</Text>
            </SafeAreaView>
        )
    }
    return (
        <FlatList
            data={students}
            renderItem={renderUser}
            keyExtractor={(user) => user.getId().toString()}
            style={styles.item}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        width: '80%',
    },
    errorMsg: {
        color: GlobalStyles.colors.red,
        fontSize: 14,
        textAlign: 'center',
    },
})
