import { FlatList, StyleSheet } from 'react-native'
import BasicStudent from '../../models/BasicStudent'
import StudentItem from './StudentItem'

interface StudentListProps {
    students: BasicStudent[]
}

export default function StudentList({ students }: StudentListProps) {
    const renderUser = ({ item }: { item: BasicStudent }) => {
        return <StudentItem student={item} />
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
    item: {
        width: '80%',
    },
})
