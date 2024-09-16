import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import CustomBtn from '../ui/CustomBtn'

interface FilterLoginsProps {
    filterLogins: () => void
}

export default function FilterLogins({ filterLogins }: FilterLoginsProps) {
    const [login, setLogin] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Filter by login:</Text>
            <View style={styles.inputbtn}>
                <TextInput
                    style={styles.input}
                    value={login}
                    onChangeText={setLogin}
                    inputMode='text'
                    maxLength={15}
                    spellCheck={false}
                    autoCorrect={false}
                    autoCapitalize='none'
                    cursorColor={GlobalStyles.colors.beige}
                    placeholder='Enter at least 3 characters'
                    placeholderTextColor={GlobalStyles.colors.beige}
                />

                <CustomBtn
                    title="Filter"
                    onPress={filterLogins}
                    mode="raised"
                    style={styles.button}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 8,
        color: GlobalStyles.colors.darkBrown,
    },
    input: {
        fontSize: 12,
        borderWidth: 1,
        borderColor: GlobalStyles.colors.darkGreen,
        padding: 8,
        width: '65%',
        borderRadius: GlobalStyles.card.borderRadius,
        color: GlobalStyles.colors.beige,
        
    },
    inputbtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        padding: 10,
    },
    button: {
        width: '30%',
    },
})
