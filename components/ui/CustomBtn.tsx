import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

interface CustomBtnProps {
    title: string
    onPress: () => void
    mode?: 'flat' | 'raised'
    style?: ViewStyle
    disableBtn?: boolean
}

export default function CustomBtn({
    title,
    onPress,
    mode,
    style,
    disableBtn
}: CustomBtnProps) {
    return (
        <View style={style}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => (pressed || disableBtn) && styles.pressed}
                disabled={disableBtn}
            >
                <View style={[styles.btn, mode === 'flat' && styles.flat]}>
                    <Text
                        style={[
                            styles.text,
                            mode === 'flat' && styles.flatText,
                        ]}
                    >
                        {title}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: GlobalStyles.card.borderRadius,
        padding: 8,
        backgroundColor: GlobalStyles.colors.darkGreen,
    },
    flat: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: GlobalStyles.colors.darkGreen,
    },
    text: {
        color: GlobalStyles.colors.beige,
        fontSize: 16,
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.colors.beige,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.lightGreen,
        borderRadius: GlobalStyles.card.borderRadius,
        
    },
})
