import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/Profile.screen";
import { EditProfile } from "../screens/EditProfile.screen";
const Stack = createStackNavigator();

export function ProfileStack() {
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
