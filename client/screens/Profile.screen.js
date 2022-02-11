import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { theme } from "../theme";
import { getLanguageList } from "../utils/getLanguageList";
import { useReducerContext } from "../context/reducerContext";

export function Profile({ route }) {
    const navigation = useNavigation();
    const { user: userData, dispatch } = useReducerContext();
    const user = route?.params?.user ? route.params.user : userData;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: user.profilePicture }}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{user.name}</Text>

                    {userData._id === user._id ? (
                        <TouchableOpacity
                            style={[styles.button]}
                            onPress={() =>
                                navigation.navigate("EditProfileScreen")
                            }
                        >
                            <Text>Edit Profile</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.button, styles.messageButton]}
                            onPress={() => {
                                dispatch({
                                    type: "SET_CHAT_ROOM",
                                    payload: {},
                                });
                                navigation.navigate("Chat", {
                                    otherUser: user,
                                });
                            }}
                        >
                            <Text>Message</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={styles.profileBody}>
                <Text style={styles.heading}>Languages</Text>
                <Text style={styles.text}>
                    <Text style={styles.subheading}>Knows: </Text>
                    {getLanguageList(user.known)}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subheading}>Learning: </Text>
                    {getLanguageList(user.learning)}
                </Text>
                <Text style={styles.heading}>Introduction</Text>
                <Text style={styles.text}>{user.bio}</Text>

                <Text style={styles.heading}>Interest & Hobbies</Text>
                <Text style={styles.text}>{user.hobbies}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    profileHeader: {
        flexDirection: "row",
    },
    image: { height: 120, width: 120, borderRadius: 100 },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
    },
    name: { fontSize: 22, fontWeight: "bold" },
    text: {
        color: theme.lightText,
        fontSize: 16,
    },
    button: {
        borderColor: theme.lightText,
        borderWidth: 1,
        padding: 5,
        marginTop: 10,
        borderRadius: 50,
        alignItems: "center",
    },
    profileBody: {
        marginTop: 10,
    },
    heading: {
        fontSize: 18,
        marginVertical: 10,
        fontWeight: "bold",
        marginTop: 30,
    },
    subheading: { fontSize: 17, marginVertical: 5, fontWeight: "700" },
    messageButton: {
        borderColor: theme.primaryColor,
        backgroundColor: theme.primaryColor,
    },
});
