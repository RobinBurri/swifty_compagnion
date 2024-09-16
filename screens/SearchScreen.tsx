import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FilterLogins from '../components/searchUsers/FilterLogins'
import UserList from '../components/searchUsers/UserList'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import BasicUser from '../models/BasicUser'

export default function SearchScreen() {
    const [user, setUser] = useState<BasicUser[]>([
        new BasicUser(
            96401,
            'https://cdn.intra.42.fr/users/fa213c2aa1c849f4630b4d94e48c3b5c/rburri.jpg',
            'rburri'
        ),
        new BasicUser(
            96402,
            'https://cdn.intra.42.fr/users/52176b735551a1a1f27ea997e36b9ccf/sbars.jpg',
            'sbars'
        ),
        new BasicUser(
            96403,
            'https://cdn.intra.42.fr/users/8064d076cacd8605b412baca23d88b3b/epresa-c.jpg',
            'epresa-c'
        ),
    ])
    const [isFetching, setIsFetching] = useState(false)
    useEffect(() => {
        async function getStudents() {
            setIsFetching(true)
            setTimeout(() => {
                setIsFetching(false)
            }, 1000)

            // try {
            //     const expenses = await fetchExpenses()
            //     expensesCtx.setExpenses(expenses)
            // } catch (error) {
            //     setError("Couldn't fetch expenses")
            // }
        }
        getStudents()
    }, [])

    if (isFetching) {
        return <LoadingOverlay />
    }

    return (
        <SafeAreaView style={styles.container}>
            <FilterLogins filterLogins={() => {}} />
            <UserList users={user} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
