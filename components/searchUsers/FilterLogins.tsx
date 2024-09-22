import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import CustomBtn from '../ui/CustomBtn'

interface FilterLoginsProps {
    filterLoginHandler: (enteredLogin: string) => void
}

export default function FilterLogins({
    filterLoginHandler,
}: FilterLoginsProps) {
    const [enteredLogin, setEnteredLogin] = useState('')
    const [disableBtn, setDisableBtn] = useState(true)

    const onChangeLoginHandler = (text: string) => {
        setEnteredLogin(text)
        if (text.length >= 2) {
            setDisableBtn(false)
        } else {
            setDisableBtn(true)
        }
    }

    const filterHandler = () => {
        if (enteredLogin.length < 2) {
            return
        }
        setDisableBtn(true)
        filterLoginHandler(enteredLogin)
        setEnteredLogin('')
        setTimeout(() => {
            setDisableBtn(false)
        }, 1000)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Filter by login</Text>
            <View style={styles.inputbtn}>
                <TextInput
                    style={styles.input}
                    value={enteredLogin}
                    onChangeText={onChangeLoginHandler}
                    inputMode="text"
                    maxLength={15}
                    spellCheck={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    cursorColor={GlobalStyles.colors.beige}
                    placeholder="Enter at least 2 characters"
                    placeholderTextColor={GlobalStyles.colors.beige}
                    keyboardAppearance="default"
                    keyboardType="default"
                />

                <CustomBtn
                    title="Filter"
                    onPress={filterHandler}
                    mode="raised"
                    style={styles.button}
                    disableBtn={disableBtn}
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
        fontWeight: 'bold',
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
