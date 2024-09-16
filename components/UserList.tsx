import { FlatList, Image, Text, View } from "react-native";
import BasicUser from "../models/BasicUser";

interface UserListProps {
    users: BasicUser[];
}

export default function UserList({users}: UserListProps) {

    const renderUser = ({item : user}: {item: BasicUser}) => {
        return (
            <View>
                <Image source={{uri: user.getPicture()}} style={{width: 100, height: 100}} />
                <Text>{user.getLogin()}</Text>
            </View>
        );
    }
    return (
        <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(user) => user.getId().toString()} />     
    );
}