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
            const newChatRooms = [...state.chatRooms].splice(
                chatRoomIndex,
                1,
                newChatRoom
            );
            return { ...state, chatRooms: newChatRooms };
        default:
            return state;
    }
}

export const initialState = {
    user: {},
    findUsers: [],
    chatRooms: [],
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
