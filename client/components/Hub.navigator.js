import { createStackNavigator } from "@react-navigation/stack";
import { Hub } from "../screens/Hub.screen";
import { Chat } from "../screens/Chat.screen";
const Stack = createStackNavigator();

export function HubStack({ sendRealTimeMessage }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RoomsList"
                component={Hub}
                options={{ title: "LingoHub" }}
            />
            <Stack.Screen
                name="Chat"
                children={({ route }) => (
                    <Chat
                        sendRealTimeMessage={sendRealTimeMessage}
                        route={route}
                    />
                )}
                options={({ route }) => ({
                    title: route.params.otherUser.name,
                })}
            />
        </Stack.Navigator>
    );
}
