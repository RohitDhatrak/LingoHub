import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

export function Signup() {
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();

    const signUp = useCallback(() => {
        async function firebaseSignup() {
            const emailRegex = /\S+@\S+\.\S+/;

            if (!emailRegex.test(email.toLowerCase())) {
                setError("Enter a valid email address");
                return;
            }

            if (email === "" || password === "") {
                setError("Email and password are mandatory");
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
                if (error.code === "auth/weak-password")
                    setError("Password should be atleast 6 characters long");
                else if (error.code === "auth/email-already-in-use")
                    setError("Email already in use");
                else setError("Some error occured");
            }
        }
        firebaseSignup();
    }, [email, password, confirmPassword, auth]);

    useEffect(() => {
        navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: "none" } });
        return () =>
            navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.heading}>Signup</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            ></TextInput>
            <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
            ></TextInput>
            {!!error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity
                style={[styles.button, styles.signup]}
                onPress={signUp}
            >
                <Text>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.login]}
                onPress={() => navigation.navigate("Login")}
            >
                <Text>Login</Text>
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
    signup: {
        backgroundColor: theme.primaryColor,
        marginTop: 20,
    },
    login: {
        borderColor: theme.primaryColor,
        borderWidth: 2,
    },
});
