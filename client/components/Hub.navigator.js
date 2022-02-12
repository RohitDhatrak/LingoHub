import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { Hub } from "../screens/Hub.screen";
import { Chat } from "../screens/Chat.screen";
import { Profile } from "../screens/Profile.screen";

const Stack = createStackNavigator();

export function HubStack({ sendRealTimeMessage }) {
    const navigation = useNavigation();

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
                    headerTitle: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("UserDetails", {
                                    user: route.params.otherUser,
                                    doesRoomExist: true,
                                })
                            }
                        >
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>
                                {route.params.otherUser.name}
                            </Text>
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="UserDetails"
                component={Profile}
                options={({ route }) => ({ title: route.params.user.name })}
            />
        </Stack.Navigator>
    );
}
