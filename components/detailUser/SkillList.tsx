import { FlatList, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Student, { Skill } from '../../models/Student'

export default function SkillList({ studentData }: { studentData: Student }) {
    const skills = studentData
        .getSkills()
    if (skills.length === 0) {
        return <Text>No 42 Skill</Text>
    }

    const renderItem = ({ item }: { item: Skill }) => {

        return (
            <View style={styles.skillItem}>
                <View style={styles.name}>
                    <Text>{item?.name}</Text>
                    <Text>{item?.level.toFixed(2)}</Text>
                </View>
            </View>
        )
    }

    return (
        <FlatList
            data={skills}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
        />
    )
}

const styles = StyleSheet.create({
    skillItem: {
        padding: 15,
        margin: 10,
        backgroundColor: GlobalStyles.colors.lightGreen,
        borderRadius: GlobalStyles.card.borderRadius,
        minWidth: '80%',
        justifyContent: 'center',
    },

    name: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    result: {
        marginTop: 10,
        alignSelf: 'center',
    },
})
