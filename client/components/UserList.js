import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { theme } from "../theme";
import { User } from "../data";
import { getLanguageList } from "../utils/getLanguageList";
// used User context

export function UserList({ user }) {
    const navigation = useNavigation();
    if (user._id === User._id) return null;

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("UserProfile", { user })}
        >
            <Image source={{ uri: user.profilePicture }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.text}>
                    Knows: {getLanguageList(user.known)}
                </Text>
                <Text style={styles.text}>
                    Learning: {getLanguageList(user.learning)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 13,
        paddingHorizontal: 10,
    },
    image: { height: 55, width: 55, borderRadius: 40 },
    textContainer: {
        paddingHorizontal: 10,
        flex: 1,
    },
    text: {
        color: theme.lightText,
    },
    name: { fontSize: 17, fontWeight: "bold" },
});
