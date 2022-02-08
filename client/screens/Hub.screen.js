import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { ChatRoom } from "../components/ChatRoom";
import { useReducerContext } from "../context/reducerContext";
import { getChatRooms } from "../services/chatRooms";

export function Hub() {
    const { user, dispatch, chatRooms } = useReducerContext();

    useEffect(() => {
        async function getData() {
            const { rooms } = await getChatRooms(user._id);
            dispatch({ type: "SET_CHAT_ROOMS", payload: rooms });
        }
        getData();
    }, []);

    if (chatRooms.length === 0) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 40,
                }}
            >
                <Text>
                    You can check out the Find section to find language partners
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={chatRooms}
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
