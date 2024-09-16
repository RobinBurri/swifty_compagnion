import { useState } from "react";
import { Text, View } from "react-native";
import BasicUser from "../models/BasicUser";

export default function DetailScreen() {
    const [user, setUser] = useState<BasicUser[]>([
        new BasicUser(96401, "https://cdn.intra.42.fr/users/fa213c2aa1c849f4630b4d94e48c3b5c/rburri.jpg", "rburri"),
        new BasicUser(96402, "https://cdn.intra.42.fr/users/52176b735551a1a1f27ea997e36b9ccf/sbars.jpg", "sbars"),
        new BasicUser(96403, "https://cdn.intra.42.fr/users/8064d076cacd8605b412baca23d88b3b/epresa-c.jpg", "epresa-c"),
    ]);

    return (
        <View>
            <Text>Detail Screen</Text>
        </View>
    );
}