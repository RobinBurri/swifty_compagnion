import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Student from '../../models/Student'
import splitLevel from '../../utils/splitLevel'

export default function LevelAndPoints({
    studentData,
}: {
    studentData: Student
}) {
    const { level, percent } = splitLevel(studentData.getLevel())

    return (
        <View style={styles.levelAndPoints}>
            <View style={styles.points}>
                <Text style={styles.textColor}>
                    wallet points: {studentData.getWallet()}
                </Text>
                <Text style={styles.textColor}>
                    Evaluation points: {studentData.getCorrectionPoints()}
                </Text>
            </View>

            <Text style={styles.textColor}>
                Level: {level} - {percent}%
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    levelAndPoints: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '90%',
    },
    points: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10,
    },
    textColor: {
        color: GlobalStyles.colors.darkGreen,
        textAlign: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
})
