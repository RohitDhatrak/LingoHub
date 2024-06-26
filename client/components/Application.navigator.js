import { io } from "socket.io-client";
import { useCallback, useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert, Text, View } from "react-native";
import { HomeIcon, ProfileIcon, FindIcon } from "../assets/Icons";
import { useReducerContext } from "../context/reducerContext";
import { HubStack } from "./Hub.navigator";
import { FindStack } from "./Find.navigator";
import { ProfileStack } from "./Profile.navigator";
import { Auth } from "./Auth.navigation";
import { getUser } from "../services/userData";
import { useAuthentication } from "../utils/useAuthentication";
import Constants from "expo-constants";
import { getChatRooms } from "../services/chatRooms";

const Tabs = createBottomTabNavigator();

// if (!window.location) {
//     window.navigator.userAgent = "react-native";
// }

export function Application() {
    const { user, dispatch, chatRoom } = useReducerContext();
    const { user: authUser, setIsLoading, isLoading } = useAuthentication();
    const socket = useRef();

    useEffect(() => {
        if (socket.current) {
            socket.current.emit("saveUser", user._id);
        }
    }, [socket, user]);

    useEffect(() => {
        socket.current = io(Constants.expoConfig.extra.socketEndpoint, {
            transports: ["websocket"],
            jsonp: false,
        });
        socket.current.on("getMessage", ({ message, room }) => {
            if (message) {
                dispatch({
                    type: "ADD_RECEIVED_MESSAGE",
                    payload: {
                        chatRoomId: message.roomId,
                        message: message,
                    },
                });
            }
            if (room) {
                dispatch({ type: "ADD_CHAT_ROOM", payload: room });
            }
        });
    }, []);

    useEffect(() => {
        if (authUser?.email) {
            async function getInitialData() {
                try {
                    const { user } = await getUser(authUser.email);
                    dispatch({ type: "SET_USER", payload: user });
                    const { rooms } = await getChatRooms(user._id);
                    dispatch({ type: "SET_CHAT_ROOMS", payload: rooms });
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    Alert.alert(
                        "Error",
                        "Something went wrong while loading your data"
                    );
                }
            }
            getInitialData();
        }
    }, [authUser]);

    function sendRealTimeMessage(message, receiverId, room) {
        socket.current.emit("sendMessage", { message, receiverId, room });
    }

    const iconFuction = useCallback(
        ({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                if (route.name === "Hub")
                    return <HomeIcon color={color} size={size} />;
                if (route.name === "Find")
                    return <FindIcon color={color} size={size} />;
                if (route.name === "Profile")
                    return <ProfileIcon color={color} size={size} />;
                return null;
            },
        }),
        []
    );

    if (isLoading)
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Loading...</Text>
            </View>
        );

    if (!user?._id) return <Auth />;

    return (
        <Tabs.Navigator initialRouteName="Hub" screenOptions={iconFuction}>
            <Tabs.Screen
                name="Hub"
                children={() => (
                    <HubStack sendRealTimeMessage={sendRealTimeMessage} />
                )}
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                name="Find"
                component={FindStack}
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileStack}
                options={{ headerShown: false }}
            />
        </Tabs.Navigator>
    );
}
