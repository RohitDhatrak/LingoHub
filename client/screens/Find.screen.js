import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { UserList } from "../components/UserList";
import { useReducerContext } from "../context/reducerContext";
import { getUsers } from "../services/userData";
import { getSearchData } from "../services/search";

export function Find() {
    const { findUsers, dispatch, user } = useReducerContext();
    const [clicked, setClicked] = useState();
    const [searchPhrase, setSearchPhrase] = useState();
    const [searchResults, setSearchResults] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const arraytoBeFiltered =
        searchPhrase && searchResults ? searchResults : findUsers;
    const filteredUsers = arraytoBeFiltered.filter(
        (partner) =>
            !(partner._id === user._id || user.partnersHashMap[partner._id])
    );

    useEffect(() => {
        async function fetchUsers() {
            setIsLoading(true);
            const { users } = await getUsers();
            dispatch({ type: "SET_FIND_USERS", payload: users });
            setIsLoading(false);
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchResults) {
            setSearchResults(null);
        }
    }, [searchPhrase]);

    const getSearchResults = useCallback(() => {
        if (searchPhrase?.trim()) {
            async function getData() {
                const { users } = await getSearchData(searchPhrase);
                setSearchResults(users);
            }
            getData();
        }
    }, [searchPhrase]);

    if (isLoading)
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Loading...</Text>
            </View>
        );

    if (!searchPhrase && filteredUsers?.length === 0)
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
                getSearchResults={getSearchResults}
            />
            {!!searchPhrase && searchResults?.length === 0 && (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text>No results match your search</Text>
                </View>
            )}
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
