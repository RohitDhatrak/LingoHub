import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    FlatList,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Button,
} from "react-native";
import { Message } from "../components/Message";
import { useNavigation } from "@react-navigation/native";

export function Chat({ route }) {
    const otherUser = route.params.otherUser;
    const chatRoom = route.params?.room ? route.params.room : { messages: [] };
    const [message, setMessage] = useState("");
    const navigation = useNavigation();
    const listRef = useRef(null);

    useEffect(() => {
        navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: "none" } });
        return () =>
            navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    return (
        <>
            <FlatList
                style={styles.container}
                data={chatRoom.messages}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.contentContainer}
                ref={listRef}
                onContentSizeChange={() => listRef.current.scrollToEnd()}
                renderItem={({ item }) => (
                    <Message message={item} otherUser={otherUser} />
                )}
            ></FlatList>
            <KeyboardAvoidingView style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    onPressIn={() => listRef.current.scrollToEnd()}
                />
                <Button onPress={() => console.log("pressed")} title="Send" />
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    contentContainer: {
        flexGrow: 1,
    },
    inputContainer: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    input: {
        flex: 1,
    },
});
