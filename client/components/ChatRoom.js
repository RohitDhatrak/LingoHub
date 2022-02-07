import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { User } from "../data";
import { theme } from "../theme";

// used user context

export function ChatRoom({ room }) {
    const user =
        room?.members[0]?._id === User?._id
            ? room?.members[1]
            : room?.members[0];

    if (!user?._id) return null;

    return (
        <TouchableOpacity style={styles.container}>
            <Image source={{ uri: user.profilePicture }} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.nameBadgeContainer}>
                    <Text style={styles.name}>{user.name}</Text>
                    {!!room.unreadCount && (
                        <Text style={styles.unreadBadge}>
                            {room.unreadCount}
                        </Text>
                    )}
                </View>
                <View style={styles.msgTimeContainer}>
                    <Text style={styles.message}>
                        {room.messages[room.messages.length - 1].message}
                    </Text>
                    <Text style={styles.timeContainer}>
                        {new Date(room.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                </View>
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
        paddingVertical: 1,
        flex: 1,
    },
    nameBadgeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    unreadBadge: {
        fontSize: 10,
        fontWeight: "700",
        paddingHorizontal: 4,
        paddingVertical: 3,
        borderRadius: 100,
        backgroundColor: theme.badge,
        alignSelf: "flex-end",
    },
    name: { fontSize: 17, fontWeight: "bold" },
    msgTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    message: { fontSize: 15, color: theme.lightText },
    timeContainer: {
        fontSize: 12,
        color: theme.lightText,
        alignSelf: "flex-end",
    },
});
