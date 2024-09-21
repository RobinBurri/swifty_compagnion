import { StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { Skill } from "../../models/Student"
import { SkillProgressBar } from "../ui/SkillProgressBar"

export const renderSkillItem = ({ item }: { item: Skill }) => {
    return (
        <View style={styles.skillItem}>
            <View>
                <Text style={styles.skillTitle}>{item?.name}</Text>
            </View>
            <SkillProgressBar value={item?.level} />
        </View>
    )
}

const styles = StyleSheet.create({
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
        textAlign: 'center',
    },
})
