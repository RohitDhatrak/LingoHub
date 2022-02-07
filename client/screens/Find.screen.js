import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { UserList } from "../components/UserList";
import { Users } from "../data";

export function Find() {
    const [clicked, setClicked] = useState();
    const [searchPhrase, setSearchPhrase] = useState();

    return (
        <View style={styles.container}>
            <SearchBar
                clicked={clicked}
                setClicked={setClicked}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
            />
            <FlatList
                data={Users}
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
