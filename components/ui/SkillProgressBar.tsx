import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

interface ProgressBarProps {
    value: number
}

export const SkillProgressBar = ({ value }: ProgressBarProps) => {
    const fillPercentage = (value / 20) * 100

    return (
        <View style={styles.container}>
            <View style={styles.gauge}>
                <View
                    style={[
                        styles.fill,
                        {
                            width: `${fillPercentage}%`,
                        },
                    ]}
                ></View>
            </View>
            <Text style={styles.pbText}>
                {value.toFixed(2)} - {fillPercentage.toFixed(2)}%
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 15,
    },
    gauge: {
        width: '80%',
        height: 20,
        backgroundColor: GlobalStyles.colors.beige,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 5,
    },
    fill: {
        height: '100%',
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    pbText: {
        color: GlobalStyles.colors.darkGreen,
        textAlign: 'center',
        lineHeight: 20,
        fontWeight: 'bold',
    },
})
