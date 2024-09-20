import { FlatList, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Student from '../../models/Student'
import { renderProjectItem } from './renderProjectItem'

export default function ProjectList({ studentData }: { studentData: Student }) {
    const projects = studentData.getProjects()
    if (projects.length === 0) {
        return <Text style={styles.noContentText}>No 42 projects as Student</Text>
    }

    return (
        <FlatList
            data={projects}
            renderItem={renderProjectItem}
            keyExtractor={(item) => item.project?.name}
            style={styles.flatList}
        />
    )
}

const styles = StyleSheet.create({
    flatList: {
        marginBottom: 20,
    },
    noContentText: {
        alignSelf: "center",
        marginTop: 20,
        color: GlobalStyles.colors.red,
    }
})