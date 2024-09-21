import { FlatList, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Student from '../../models/Student'
import { renderSkillItem } from './renderSkillItem'

export default function SkillList({ studentData }: { studentData: Student }) {
    const skills = studentData
        .getSkills()
    if (skills.length === 0) {
        return <Text style={styles.noContentText}>No 42 Skill as Student</Text>
    }

    return (
        <FlatList
            data={skills}
            renderItem={renderSkillItem}
            keyExtractor={(item) => item.name}
            style={styles.flatList}
        />
    )
}

const styles = StyleSheet.create({
    flatList: {
        marginBottom: 20,
    },
    result: {
        marginTop: 10,
        alignSelf: 'center',
    },
    noContentText: {
        alignSelf: "center",
        marginTop: 20,
        color: GlobalStyles.colors.red,
    }
})
