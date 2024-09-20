import { FlatList, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Student, { Skill } from '../../models/Student'

export default function SkillList({ studentData }: { studentData: Student }) {
    const skills = studentData
        .getSkills()
    if (skills.length === 0) {
        return <Text style={styles.noContentText}>No 42 Skill as Student</Text>
    }

    const renderItem = ({ item }: { item: Skill }) => {
        return (
            <View style={styles.skillItem}>
                <View style={styles.name}>
                    <Text style={styles.skillTitle}>{item?.name}</Text>
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
            style={styles.flatList}
        />
    )
}

const styles = StyleSheet.create({
    flatList: {
        marginBottom: 20,
    },
    skillItem: {
        padding: 15,
        margin: 5,
        backgroundColor: GlobalStyles.colors.lightGreen,
        borderRadius: GlobalStyles.card.borderRadius,
        minWidth: '90%',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    skillTitle: {
        fontWeight: 'bold',
        color: GlobalStyles.colors.beige,
    },

    name: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
