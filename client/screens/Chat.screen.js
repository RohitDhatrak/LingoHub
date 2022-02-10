import React, { useState, useEffect, useRef, useCallback } from "react";
import uuid from "react-native-uuid";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Button,
    Alert,
} from "react-native";
import { Message } from "../components/Message";
import { useNavigation } from "@react-navigation/native";
import { useReducerContext } from "../context/reducerContext";
import { sendMessage } from "../services/message";
import { markAsRead } from "../services/chatRooms";

export function Chat({ route }) {
    const { chatRooms, user, dispatch } = useReducerContext();
    const receiver = route.params.otherUser;
    const [chatRoom, setChatRoom] = useState(
        chatRooms.find(
            (chatRoom) =>
                chatRoom.members[0]._id === receiver._id ||
                chatRoom.members[1]._id === receiver._id
        )
    );
    const [message, setMessage] = useState("");
    const navigation = useNavigation();
    const listRef = useRef(null);

    useEffect(() => {
        async function markMessagesAsRead() {
            if (chatRoom._id) {
                try {
                    dispatch({
                        type: "MARK_CHAT_ROOM_AS_READ",
                        payload: chatRoom._id,
                    });
                    await markAsRead(user._id, chatRoom._id);
                } catch (error) {
                    Alert.alert(
                        "Error",
                        "Something went wrong while synchronizing messages"
                    );
                }
            }
        }
        markMessagesAsRead();
    }, [chatRoom]);

    useEffect(() => {
        navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: "none" } });
        return () =>
            navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const sendMessageHandler = useCallback(() => {
        async function sendData() {
            try {
                const messageObject = {
                    _id: uuid.v4(),
                    createdAt: new Date(),
                    body: message,
                    sender: user._id,
                };
                if (chatRoom) {
                    setChatRoom({
                        ...chatRoom,
                        messages: [...chatRoom.messages, messageObject],
                    });
                } else {
                    setChatRoom({ messages: [messageObject] });
                }
                setMessage("");
                const { message: msg, room } = await sendMessage(
                    chatRoom?._id,
                    receiver._id,
                    user._id,
                    message
                );
                if (room) {
                    dispatch({ type: "ADD_CHAT_ROOM", payload: room });
                    setChatRoom(room);
                } else {
                    dispatch({
                        type: "ADD_MESSAGE",
                        payload: { message: msg, chatRoomId: chatRoom._id },
                    });
                }
            } catch (error) {
                setChatRoom(
                    chatRooms.find(
                        (chatRoom) =>
                            chatRoom.members[0]._id === receiver._id ||
                            chatRoom.members[1]._id === receiver._id
                    )
                );

                Alert.alert(
                    "Error",
                    "Some error occured while sending your message"
                );
            }
        }
        sendData();
    }, [chatRoom, receiver, user, message]);

    return (
        <>
            <FlatList
                style={styles.container}
                data={chatRoom?.messages || []}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.contentContainer}
                ref={listRef}
                onContentSizeChange={() => listRef.current.scrollToEnd()}
                renderItem={({ item }) => (
                    <Message message={item} receiver={receiver} />
                )}
            ></FlatList>
            {(!chatRoom || chatRoom?.messages?.length === 0) && (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                    }}
                >
                    <Text>
                        You haven't interacted yet. Be the first to say Hello!
                    </Text>
                </View>
            )}
            <KeyboardAvoidingView style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    onPressIn={() => listRef.current.scrollToEnd()}
                    onSubmitEditing={sendMessageHandler}
                />
                <Button onPress={sendMessageHandler} title="Send" />
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
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
