import { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "../reducer/reducer";
const ReducerContext = createContext();

export function ReducerContextProvider({ children }) {
    const [{ user, findUsers, chatRooms, languages }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const data = {
        user,
        findUsers,
        chatRooms,
        languages,
        dispatch,
    };

    return (
        <ReducerContext.Provider value={data}>
            {children}
        </ReducerContext.Provider>
    );
}

export function useReducerContext() {
    return useContext(ReducerContext);
}
