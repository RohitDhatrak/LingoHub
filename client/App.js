import { StyleSheet, StatusBar, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "./firebase";
import { Application } from "./components/Application.navigator";
import { Auth } from "./components/Auth.navigation";
import { useAuthentication } from "./utils/useAuthentication";

export default function App() {
    const { user } = useAuthentication();

    return (
        <NavigationContainer>
            {user ? <Application /> : <Auth />}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
