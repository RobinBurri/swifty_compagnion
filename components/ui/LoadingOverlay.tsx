import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function LoadingOverlay() {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={GlobalStyles.colors.darkGreen} />
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
})