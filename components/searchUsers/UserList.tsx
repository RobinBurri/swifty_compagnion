import { FlatList, StyleSheet } from 'react-native'
import BasicUser from '../../models/BasicUser'
import UserListItem from './UserListItem'

interface UserListProps {
    users: BasicUser[]
}

export default function UserList({ users }: UserListProps) {
    const renderUser = ({ item: user }: { item: BasicUser }) => {
        return (
            <UserListItem item={user} />
        )
    }
    return (
        <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(user) => user.getId().toString()}
            style={styles.item}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        width: '80%',
    }
})

