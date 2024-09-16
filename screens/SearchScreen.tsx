import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

export default function SearchScreen() {
    return (
        <View>
        <Text>Search Screen</Text>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: GlobalStyles.colors.lightGreen,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });