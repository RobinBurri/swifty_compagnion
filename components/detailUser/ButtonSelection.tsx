import { StyleSheet, View } from 'react-native'
import CustomBtn from '../ui/CustomBtn'

interface ButtonSelectionProps {
    btnPressedHandler: (type: btnType) => void
}

export enum btnType {
    projects = 'projects',
    skills = 'skills',
}

export default function ButtonSelection({
    btnPressedHandler,
}: ButtonSelectionProps) {
    return (
        <View style={styles.container}>
            <CustomBtn
                title="Projects"
                onPress={() => btnPressedHandler(btnType.projects)}
                style={styles.btn}
            ></CustomBtn>
            <CustomBtn
                title="Skills"
                onPress={() => btnPressedHandler(btnType.skills)}
                style={styles.btn}
            ></CustomBtn>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        marginTop: 20,
    },
    btn: {
        minWidth: 120,
        marginHorizontal: 10,
    },
})
