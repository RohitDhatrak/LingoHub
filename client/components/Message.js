import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";
import { getDateOrTime } from "../utils/getTime";

export function Message({ message, receiver }) {
    return (
        <View
            style={[
                styles.container,
                message.sender === receiver._id ? styles.received : styles.sent,
            ]}
        >
            <Text style={styles.message}>{message.body}</Text>
            <Text
                style={[
                    styles.time,
                    message.sender === receiver._id
                        ? styles.timeReceived
                        : styles.timeSent,
                ]}
            >
                {getDateOrTime(message.createdAt)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        paddingVertical: 5,
        maxWidth: "80%",
        minWidth: "20%",
    },
    message: {
        fontSize: 18,
        paddingHorizontal: 5,
    },
    received: {
        alignSelf: "flex-start",
        backgroundColor: theme.secondaryColor,
    },
    sent: { alignSelf: "flex-end", backgroundColor: theme.primaryColor },
    time: {
        fontSize: 9,
        color: theme.lightText,
    },
    timeSent: {
        alignSelf: "flex-end",
    },
    timeReceived: {
        alignSelf: "flex-start",
    },
});
