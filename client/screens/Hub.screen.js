import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { ChatRoom } from "../components/ChatRoom";
import { ChatRooms } from "../data";

export function Hub() {
    return (
        <View style={styles.container}>
            <FlatList
                data={ChatRooms}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <ChatRoom room={item} />}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
    },
});
