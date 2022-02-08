import React, { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Find } from "../screens/Find.screen";
import { Profile } from "../screens/Profile.screen";
import { EditProfile } from "../screens/EditProfile.screen";
import { Hub } from "../screens/Hub.screen";
import { Chat } from "../screens/Chat.screen";
import { HomeIcon, ProfileIcon, FindIcon } from "../assets/Icons";
import { createStackNavigator } from "@react-navigation/stack";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

function HubStack() {
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

function FindStack() {
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

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={Profile}
                options={{ title: "My Profile" }}
            />
            <Stack.Screen
                name="EditProfileScreen"
                component={EditProfile}
                options={{ title: "Edit Profile" }}
            />
        </Stack.Navigator>
    );
}

export function Application() {
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

    return (
        <Tabs.Navigator initialRouteName="Hub" screenOptions={iconFuction}>
            <Tabs.Screen
                name="Hub"
                component={HubStack}
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
