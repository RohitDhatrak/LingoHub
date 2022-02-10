import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut, getAuth } from "firebase/auth";
// import MultiSelect from "react-native-multiple-select";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { theme } from "../theme";
import { useReducerContext } from "../context/reducerContext";
import { updateUser } from "../services/userData";

export function EditProfile() {
    const auth = getAuth();
    const navigation = useNavigation();
    const { user, dispatch, languages } = useReducerContext();
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    const [hobbies, setHobbies] = useState(user.hobbies);
    const [known, setKnown] = useState(user.known);
    const [learning, setLearning] = useState(user.learning);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const [loading, setLoading] = useState(false);

    const logOut = useCallback(() => {
        async function firebaseSignout() {
            try {
                await signOut(auth);
                dispatch({ type: "SIGN_OUT" });
            } catch (error) {
                Alert.alert("Error", "Some error occured while signing out");
            }
        }
        firebaseSignout();
    }, []);

    const saveChanges = useCallback(() => {
        async function saveData() {
            try {
                setLoading(true);
                await updateUser(
                    user.email,
                    name,
                    profilePicture,
                    bio,
                    hobbies,
                    known,
                    learning
                );
                dispatch({
                    type: "SET_USER",
                    payload: {
                        name,
                        profilePicture,
                        bio,
                        hobbies,
                        known,
                        learning,
                    },
                });
                setLoading(false);
                navigation.navigate("ProfileScreen");
            } catch (error) {
                Alert.alert("Error", "Some error occured while saving data");
                setLoading(false);
            }
        }
        saveData();
    }, [user, name, profilePicture, bio, hobbies, known, learning]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: user.profilePicture }}
                    style={styles.image}
                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.save]}
                        onPress={saveChanges}
                    >
                        <Text>{loading ? "Saving..." : "Save"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.logout]}
                        onPress={logOut}
                    >
                        <Text>Signout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.label}>Name</Text>
            <TextInput
                placeholder="Name"
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            ></TextInput>
            {/* <MultiSelect
                items={languages}
                uniqueKey="name"
                onSelectedItemsChange={setKnown}
                selectedItems={known}
                styleDropdownMenuSubsection={styles.dropDownMenu}
                styleInputGroup={styles.searchInput}
                selectText="Known Languages"
                searchInputPlaceholderText="Search Languages..."
                submitButtonText=""
                submitButtonColor="transparent"
            />
            <View style={{ marginTop: 20 }}>
                <MultiSelect
                    items={languages}
                    uniqueKey="name"
                    onSelectedItemsChange={setLearning}
                    selectedItems={learning}
                    styleDropdownMenuSubsection={styles.dropDownMenu}
                    styleInputGroup={styles.searchInput}
                    selectText="Learning"
                    searchInputPlaceholderText="Search Languages..."
                    submitButtonText=""
                    submitButtonColor="transparent"
                />
            </View> */}
            <Text style={[styles.label, { marginTop: 10 }]}>Introduction</Text>
            <TextInput
                placeholder="Introduction"
                style={[styles.input, styles.multiline]}
                value={bio}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setBio(text)}
            ></TextInput>
            <Text style={styles.label}>Interests and Hobbies</Text>
            <TextInput
                placeholder="Interests and Hobbies"
                style={[styles.input, styles.multiline]}
                value={hobbies}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setHobbies(text)}
            ></TextInput>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 5,
    },
    imageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 100,
    },
    buttonsContainer: {
        marginLeft: 10,
        width: "60%",
        alignItems: "center",
    },
    inputContainer: {
        width: "100%",
        margin: "auto",
    },
    label: {
        fontSize: 14,
        alignSelf: "flex-start",
    },
    input: {
        borderColor: theme.lightText,
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        width: "100%",
        marginVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    dropDownMenu: { height: 50, paddingLeft: 10, borderRadius: 10 },
    searchInput: {
        height: 50,
        marginTop: 10,
        paddingRight: 30,
        paddingLeft: 10,
    },
    multiline: {
        height: 100,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
        marginVertical: 5,
    },
    save: {
        backgroundColor: theme.primaryColor,
        marginTop: 20,
    },
    logout: {
        borderColor: theme.error,
        borderWidth: 2,
    },
});
