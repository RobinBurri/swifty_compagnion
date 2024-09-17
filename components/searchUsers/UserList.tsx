import { FlatList, StyleSheet } from 'react-native'
import BasicStudent from '../../models/BasicStudent'
import UserListItem from './UserListItem'

interface UserListProps {
    users: BasicStudent[]
}

export default function UserList({ users }: UserListProps) {
    const renderUser = ({ item: user }: { item: BasicStudent }) => {
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

