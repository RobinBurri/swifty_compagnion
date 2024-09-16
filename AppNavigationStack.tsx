import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './screens/DetailScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigationStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    );
}