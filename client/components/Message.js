import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../theme";

export function Message({ message, otherUser }) {
    return (
        <View
            style={[
                styles.container,
                message.sender === otherUser._id
                    ? styles.received
                    : styles.sent,
            ]}
        >
            <Text
                style={[
                    styles.message,
                    message.sender === otherUser._id
                        ? styles.receivedBody
                        : styles.sentBody,
                ]}
            >
                {message.body}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: "row" },
    message: {
        fontSize: 18,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        paddingHorizontal: 20,
        maxWidth: "80%",
    },
    received: { justifyContent: "flex-start" },
    sent: { justifyContent: "flex-end" },
    receivedBody: { backgroundColor: theme.secondaryColor },
    sentBody: { backgroundColor: theme.primaryColor },
});
