import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

export function Chat({ route, sendRealTimeMessage }) {
    const { user, dispatch, chatRoom } = useReducerContext();
    const receiver = route.params.otherUser;
    const [message, setMessage] = useState("");
    const navigation = useNavigation();
    const listRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    function messageFunction({ item }) {
        return <Message message={item} receiver={receiver} />;
    }

    const memoizedMessage = useMemo(
        () => messageFunction,
        [chatRoom, receiver]
    );

    const markMessagesAsRead = useCallback(() => {
        async function callAsyncFunc() {
            if (chatRoom?._id) {
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
        callAsyncFunc();
    }, [chatRoom]);

    useEffect(() => {
        markMessagesAsRead();
        return () => {
            dispatch({ type: "SET_CHAT_ROOM", payload: {} });
            markMessagesAsRead();
        };
    }, []);

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
                markMessagesAsRead();
                const messageObject = {
                    _id: uuid.v4(),
                    createdAt: new Date(),
                    body: message,
                    sender: user._id,
                    roomId: chatRoom?._id,
                };
                if (chatRoom?._id) {
                    sendRealTimeMessage(messageObject, receiver._id);
                    dispatch({
                        type: "SET_CHAT_ROOM",
                        payload: {
                            ...chatRoom,
                            messages: [...chatRoom.messages, messageObject],
                        },
                    });
                } else {
                    setIsLoading(true);
                    dispatch({
                        type: "SET_CHAT_ROOM",
                        payload: {
                            ...chatRoom,
                            messages: [messageObject],
                        },
                    });
                }
                setMessage("");
                const { message: msg, room } = await sendMessage(
                    chatRoom?._id,
                    receiver._id,
                    user._id,
                    message
                );
                setIsLoading(false);
                if (room) {
                    sendRealTimeMessage(null, receiver._id, room);
                    dispatch({ type: "ADD_CHAT_ROOM", payload: room });
                    dispatch({
                        type: "SET_CHAT_ROOM",
                        payload: room,
                    });
                } else {
                    dispatch({
                        type: "ADD_MESSAGE",
                        payload: { message: msg, chatRoomId: chatRoom._id },
                    });
                }
            } catch (error) {
                setIsLoading(false);
                dispatch({
                    type: "RESET_CHAT_ROOM",
                });
                Alert.alert(
                    "Error",
                    "Some error occured while sending your message"
                );
            }
        }
        if (message.trim() !== "") sendData();
    }, [chatRoom, receiver, user, message]);

    return (
        <>
            <FlatList
                style={styles.container}
                data={chatRoom?.messages || []}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.contentContainer}
                ref={listRef}
                onContentSizeChange={() =>
                    listRef.current.scrollToEnd({
                        animated: true,
                        scroll: "smooth",
                    })
                }
                renderItem={memoizedMessage}
                initialNumToRender={10}
                removeClippedSubviews
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
                <Button
                    onPress={sendMessageHandler}
                    title="Send"
                    disabled={isLoading}
                />
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
