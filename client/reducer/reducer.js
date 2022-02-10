export function reducer(state, { type, payload }) {
    switch (type) {
        case "SET_USER":
            return { ...state, user: { ...state.user, ...payload } };
        case "SIGN_OUT":
            return { ...state, user: {}, chatRooms: [] };
        case "SET_FIND_USERS":
            return { ...state, findUsers: payload };
        case "SET_CHAT_ROOMS":
            return { ...state, chatRooms: payload };
        case "ADD_CHAT_ROOM":
            return { ...state, chatRooms: [payload, ...state.chatRooms] };
        case "ADD_MESSAGE":
            const newChatRoom = {
                ...state.chatRooms.find(
                    ({ _id }) => _id === payload.chatRoomId
                ),
            };
            newChatRoom.messages.push(payload.message);
            const chatRoomIndex = state.chatRooms.findIndex(
                ({ _id }) => _id === payload.chatRoomId
            );
            const newChatRooms = [...state.chatRooms];
            newChatRooms.splice(chatRoomIndex, 1);
            return { ...state, chatRooms: [newChatRoom, ...newChatRooms] };
        case "MARK_CHAT_ROOM_AS_READ":
            const room = {
                ...state.chatRooms.find(({ _id }) => _id === payload),
            };
            const unreadIndex = room.members.findIndex(
                (member) => member._id === state.user._id
            );
            room.unreadCount[unreadIndex] = 0;
            const roomIndex = state.chatRooms.findIndex(
                ({ _id }) => _id === payload
            );
            const newRooms = [...state.chatRooms];
            newRooms.splice(roomIndex, 1, room);
            return { ...state, chatRooms: newRooms };
        case "SET_CHAT_ROOM":
            return { ...state, chatRoom: payload };
        case "RESET_CHAT_ROOM":
            return {
                ...state,
                chatRoom: {
                    ...chatRooms.find(
                        (chatRoom) =>
                            chatRoom.members[0]._id === receiver._id ||
                            chatRoom.members[1]._id === receiver._id
                    ),
                },
            };
        case "ADD_RECEIVED_MESSAGE":
            const newChatroom = {
                ...state.chatRooms.find(
                    ({ _id }) => _id === payload.chatRoomId
                ),
            };
            newChatroom.messages.push(payload.message);
            const unReadIndex = newChatroom.members.findIndex(
                (member) => member._id === state.user._id
            );
            newChatroom.unreadCount[unReadIndex] += 1;
            const chatroomIndex = state.chatRooms.findIndex(
                ({ _id }) => _id === payload.chatRoomId
            );
            const newChatrooms = [...state.chatRooms];
            newChatrooms.splice(chatroomIndex, 1);
            if (payload.message.roomId === state.chatRoom._id) {
                return {
                    ...state,
                    chatRoom: {
                        ...state.chatRoom,
                        messages: [...state.chatRoom.messages, payload.message],
                    },
                    chatRooms: [newChatroom, ...newChatrooms],
                };
            } else {
                return { ...state, chatRooms: [newChatroom, ...newChatrooms] };
            }

        default:
            return state;
    }
}

export const initialState = {
    user: {},
    findUsers: [],
    chatRooms: [],
    chatRoom: {},
    languages: [
        { name: "English" },
        { name: "French" },
        { name: "Spanish" },
        { name: "German" },
        { name: "Italian" },
        { name: "Portuguese" },
        { name: "Chinese" },
        { name: "Japanese" },
        { name: "Korean" },
        { name: "Russian" },
        { name: "Arabic" },
        { name: "Hindi" },
    ],
};
