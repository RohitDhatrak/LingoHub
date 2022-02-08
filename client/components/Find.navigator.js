import { createStackNavigator } from "@react-navigation/stack";
import { Find } from "../screens/Find.screen";
import { Profile } from "../screens/Profile.screen";
const Stack = createStackNavigator();

export function FindStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FindScreen"
                component={Find}
                options={{ title: "Find Partners" }}
            />
            <Stack.Screen
                name="UserProfile"
                component={Profile}
                options={({ route }) => ({ title: route.params.user.name })}
            />
        </Stack.Navigator>
    );
}
