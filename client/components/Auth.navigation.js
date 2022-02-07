import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/Login.screen";
import { Signup } from "../screens/Signup.screen";

const Stack = createStackNavigator();

export function Auth() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
