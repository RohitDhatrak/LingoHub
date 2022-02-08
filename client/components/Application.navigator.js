import React, { useCallback, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { HomeIcon, ProfileIcon, FindIcon } from "../assets/Icons";
import { useReducerContext } from "../context/reducerContext";
import { HubStack } from "./Hub.navigator";
import { FindStack } from "./Find.navigator";
import { ProfileStack } from "./Profile.navigator";
import { Auth } from "./Auth.navigation";
import { getUser } from "../services/userData";
import { useAuthentication } from "../utils/useAuthentication";

const Tabs = createBottomTabNavigator();

export function Application() {
    const { user, dispatch } = useReducerContext();
    const { user: authUser } = useAuthentication();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authUser?.email) {
            async function getInitialData() {
                const { user } = await getUser(authUser.email);
                dispatch({ type: "SET_USER", payload: user });
                setIsLoading(false);
            }
            getInitialData();
        }
        setIsLoading(false);
    }, [authUser]);

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

    if (isLoading) return <Text>Loading...</Text>;

    if (!user?._id) return <Auth />;

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
