import { NavigationContainer } from "@react-navigation/native";
import "./firebase";
import { Application } from "./components/Application.navigator";
import { Auth } from "./components/Auth.navigation";
import { useAuthentication } from "./utils/useAuthentication";
import { ReducerContextProvider } from "./context/reducerContext";

export default function App() {
    const { user } = useAuthentication();

    return (
        <ReducerContextProvider>
            <NavigationContainer>
                {user ? <Application /> : <Auth />}
            </NavigationContainer>
        </ReducerContextProvider>
    );
}
