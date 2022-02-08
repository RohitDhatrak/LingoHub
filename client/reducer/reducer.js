export function reducer(state, { type, payload }) {
    switch (type) {
        case "SET_USER":
            return { ...state, user: { ...user, ...payload } };
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
