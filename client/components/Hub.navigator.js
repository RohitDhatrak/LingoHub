import { createStackNavigator } from "@react-navigation/stack";
import { Hub } from "../screens/Hub.screen";
import { Chat } from "../screens/Chat.screen";
const Stack = createStackNavigator();

export function HubStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RoomsList"
                component={Hub}
                options={{ title: "LingoHub" }}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={({ route }) => ({
                    title: route.params.otherUser.name,
                })}
            />
        </Stack.Navigator>
    );
}
