import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { theme } from "../theme";

const auth = getAuth();

export function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const signIn = useCallback(() => {
        async function firebaseSignIn() {
            const emailRegex = /\S+@\S+\.\S+/;

            if (email === "" || password === "") {
                setError("Email and password are mandatory");
                return;
            }

            if (!emailRegex.test(email.toLowerCase())) {
                setError("Enter a valid email address");
                return;
            }

            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                if (error.code === "auth/user-not-found")
                    setError("User not found");
                else if (error.code === "auth/wrong-password")
                    setError("Wrong password");
                else if (error.code === "auth/too-many-requests")
                    setError(
                        "Account temporarily locked due to too many failed login attempts"
                    );
                else setError("Some error occured");
            }
        }
        firebaseSignIn();
    }, [email, password, auth]);

    useEffect(() => {
        navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: "none" } });
        return () =>
            navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const saveText = useCallback((text, isPassword) => {
        setError("");
        if (isPassword) setPassword(text);
        else setEmail(text);
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.heading}>Login</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={(text) => saveText(text)}
            ></TextInput>
            <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={(text) => saveText(text, true)}
                secureTextEntry
            ></TextInput>
            {!!error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity
                style={[styles.button, styles.login]}
                onPress={signIn}
            >
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.signup]}
                onPress={() => navigation.navigate("Signup")}
            >
                <Text>Signup</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        fontSize: 25,
        marginBottom: 20,
    },
    input: {
        borderColor: theme.lightText,
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        width: "70%",
        marginVertical: 10,
        padding: 10,
    },
    error: {
        color: theme.error,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        width: "60%",
        alignItems: "center",
        marginVertical: 5,
    },
    login: {
        backgroundColor: theme.primaryColor,
        marginTop: 20,
    },
    signup: {
        borderColor: theme.primaryColor,
        borderWidth: 2,
    },
});
