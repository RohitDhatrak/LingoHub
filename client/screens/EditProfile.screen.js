import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut, getAuth } from "firebase/auth";
import MultiSelect from "react-native-multiple-select";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { User, Languages } from "../data";
import { theme } from "../theme";

// used User context

export function EditProfile() {
    const auth = getAuth();
    const [name, setName] = useState(User.name);
    const [bio, setBio] = useState(User.bio);
    const [hobbies, setHobbies] = useState(User.hobbies);
    const [known, setKnown] = useState(User.known);
    const [learning, setLearning] = useState(User.learning);
    const [profilePicture, setProfilePicture] = useState(User.profilePicture);
    const navigation = useNavigation();

    const logOut = useCallback(() => {
        async function firebaseSignout() {
            try {
                await signOut(auth);
                // navigation.navigate()
            } catch (error) {
                console.log(error);
            }
        }
        firebaseSignout();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: User.profilePicture }}
                    style={styles.image}
                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, styles.save]}>
                        <Text>Save</Text>
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
            <MultiSelect
                items={Languages}
                uniqueKey="name"
                onSelectedItemsChange={setKnown}
                selectedItems={known}
                styleDropdownMenuSubsection={styles.dropDownMenu}
                styleInputGroup={styles.searchInput}
                selectText="Known Languages"
                searchInputPlaceholderText="Search Languages..."
                fixedHeight={true}
                submitButtonText=""
                submitButtonColor="transparent"
            />
            <View style={{ marginTop: 20 }}>
                <MultiSelect
                    items={Languages}
                    uniqueKey="name"
                    onSelectedItemsChange={setLearning}
                    selectedItems={learning}
                    styleDropdownMenuSubsection={styles.dropDownMenu}
                    styleInputGroup={styles.searchInput}
                    selectText="Learning"
                    searchInputPlaceholderText="Search Languages..."
                    fixedHeight={true}
                    submitButtonText=""
                    submitButtonColor="transparent"
                />
            </View>
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
