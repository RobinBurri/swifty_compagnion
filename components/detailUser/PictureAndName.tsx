import { Image, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import FullStudent from '../../models/Student'

export default function PictureAndName({
    studentData,
}: {
    studentData: FullStudent
}) {
    return (
        <View style={styles.nameAndPicture}>
            <Image
                source={{ uri: studentData.getImage() }}
                style={styles.picture}
            />
            <View style={styles.textbox}>
                <Text style={[styles.name, styles.textColor]}>
                    {studentData.getLogin()}
                </Text>
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
    textColor: {
        color: GlobalStyles.colors.darkGreen,
        textAlign: 'center',
        margin: 8,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textbox: {
        width: '50%',
        flexDirection: 'column',
    },
})
