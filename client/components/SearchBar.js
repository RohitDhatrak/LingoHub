import React from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { theme } from "../theme";

export function SearchBar({
    clicked,
    setClicked,
    searchPhrase,
    setSearchPhrase,
}) {
    return (
        <View style={styles.container}>
            <Feather
                name="search"
                size={20}
                color="#000"
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.input}
                placeholder="Search"
                value={searchPhrase}
                onChangeText={setSearchPhrase}
                onFocus={() => {
                    setClicked(true);
                }}
            />
            {clicked && (
                <Entypo
                    name="cross"
                    size={20}
                    color="black"
                    onPress={() => {
                        Keyboard.dismiss();
                        setSearchPhrase("");
                        setClicked(false);
                    }}
                    style={{}}
                />
            )}
        </View>
    );
}
export default SearchBar;

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginBottom: 5,
        padding: 10,
        flexDirection: "row",
        backgroundColor: theme.background,
        borderRadius: 15,
        alignItems: "center",
    },
    searchIcon: {
        color: theme.background,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        flex: 1,
    },
});
