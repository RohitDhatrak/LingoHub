import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { UserList } from "../components/UserList";
import { useReducerContext } from "../context/reducerContext";
import { getUsers } from "../services/userData";

export function Find() {
    const { findUsers, dispatch, user } = useReducerContext();
    const [clicked, setClicked] = useState();
    const [searchPhrase, setSearchPhrase] = useState();
    const filteredUsers = findUsers.filter(
        (partner) =>
            !(partner._id === user._id || user.partnersHashMap[partner._id])
    );

    useEffect(() => {
        async function fetchUsers() {
            const { users } = await getUsers();
            dispatch({ type: "SET_FIND_USERS", payload: users });
        }
        fetchUsers();
    }, []);

    if (filteredUsers.length === 0)
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Looks like you have interacted with everyone!</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            <SearchBar
                clicked={clicked}
                setClicked={setClicked}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
            />
            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <UserList user={item} />}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
