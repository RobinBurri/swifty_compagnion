import Ionicons from '@expo/vector-icons/Ionicons'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Student, { Project } from '../../models/Student'

export default function ProjectList({ studentData }: { studentData: Student }) {
    const projects = studentData
        .getProjects()
        .filter((project) => project.cursus_ids[0] === 66)
    if (projects.length === 0) {
        return <Text>No 42 projects</Text>
    }

    const renderItem = ({ item }: { item: Project }) => {
        let status = item?.status
        let result = item?.['validated?']
        const icon = result ? 'checkmark-circle' : 'ban'

        return (
            <View style={styles.projectItem}>
                <View style={styles.name}>
                    <Text>{item?.project?.name}</Text>
                    <Text>{status}</Text>
                </View>
                <View style={styles.result}>
                    {status === 'finished' && (
                        <>
                            <Ionicons
                                name={icon}
                                size={18}
                                color={result ? 'green' : 'red'}
                            />
                            <Text>{item?.final_mark}</Text>
                        </>
                    )}
                </View>
            </View>
        )
    }

    return (
        <FlatList
            data={projects}
            renderItem={renderItem}
            keyExtractor={(item) => item.project?.name}
        />
    )
}

const styles = StyleSheet.create({
    projectItem: {
        padding: 15,
        margin: 10,
        backgroundColor: GlobalStyles.colors.lightGreen,
        borderRadius: GlobalStyles.card.borderRadius,
        minWidth: '80%',
        justifyContent: 'center',
    },

    name: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    result: {
        marginTop: 10,
        alignSelf: 'center',
    },
})
