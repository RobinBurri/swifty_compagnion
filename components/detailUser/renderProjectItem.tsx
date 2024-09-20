import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { Project } from '../../models/Student'

export const renderProjectItem = ({ item }: { item: Project }) => {
    let status = item?.status
    let result = item?.['validated?']
    const icon = result ? 'checkmark-circle' : 'ban'
    if (status === 'in_progress' && item?.final_mark === 0) {
        status = 'failed'
    }

    const statusColor =
        status === 'finished'
            ? 'darkgreen'
            : status === 'failed'
            ? 'red'
            : 'black'

    let title = item?.project?.name
    if (title && title.length > 25) {
        title = title.substring(0, 25) + '...'
    }

    return (
        <View style={styles.projectCard}>
            <View style={styles.name}>
                <Text style={styles.projectTitle}>{title}</Text>
                <Text style={{ color: statusColor }}>{status}</Text>
            </View>
            <View style={styles.result}>
                {(status === 'finished' || status === 'failed') && (
                    <>
                        <Text style={styles.resultText}>
                            {item?.final_mark}
                        </Text>
                        <Ionicons
                            name={icon}
                            size={18}
                            color={result ? 'green' : 'red'}
                        />
                    </>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    projectCard: {
        padding: 15,
        margin: 5,
        backgroundColor: GlobalStyles.colors.lightGreen,
        borderRadius: GlobalStyles.card.borderRadius,
        minWidth: '90%',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    name: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    projectTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.beige,
    },

    result: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resultText: {
        marginRight: 5,
    },
})
