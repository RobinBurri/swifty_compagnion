import { Image, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import FullStudent from '../../models/Student'

export default function PictureAndName({
    studentData,
}: {
    studentData: FullStudent
}) {
    if (!studentData.getImage()) {
        return (
            <View style={styles.nameAndPicture}>
                <Image
                    source={require('../../assets/anonyme.jpeg')}
                    style={styles.picture}
                />
                <View style={styles.textbox}>
                    <Text style={styles.name}>
                        {studentData.getLogin()}
                    </Text>
                    {studentData.isBlackholed() && <Text style={styles.blackHoled}>Blackholed</Text>}
                </View>
            </View>
        )
    }
    return (
        <View style={styles.nameAndPicture}>
            <Image
                source={{ uri: studentData.getImage() }}
                style={styles.picture}
            />
            <View style={styles.textbox}>
                <Text style={styles.name}>
                    {studentData.getLogin()}
                </Text>
                {studentData.isBlackholed() && <Text  style={styles.blackHoled}>Blackholed</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nameAndPicture: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '90%',
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: GlobalStyles.colors.darkGreen,
        textAlign: 'center',
        margin: 8,
    },
    textbox: {
        width: '50%',
        flexDirection: 'column',
    },
    blackHoled: {
        color: GlobalStyles.colors.red,
        textAlign: 'center',
    },
})
