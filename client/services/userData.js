import axios from "axios";
import Constants from "expo-constants";

export async function createUser(email, name) {
    try {
        const response = await axios.post(
            `${Constants.expoConfig?.extra?.apiEndpoint}/user/${email}`,
            { name }
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export async function deleteUser(email) {
    try {
        const response = await axios.delete(
            `${Constants.expoConfig?.extra?.apiEndpoint}/user/${email}`
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export async function getUser(email) {
    try {
        const response = await axios.get(
            `${Constants.expoConfig?.extra?.apiEndpoint}/user/${email}`
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export async function getUsers(email) {
    try {
        const response = await axios.get(
            `${Constants.expoConfig?.extra?.apiEndpoint}/user`
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export async function updateUser(
    email,
    name,
    profilePicture,
    bio,
    hobbies,
    known,
    learning
) {
    try {
        const response = await axios.patch(
            `${Constants.expoConfig?.extra?.apiEndpoint}/user/${email}`,
            { name, profilePicture, bio, hobbies, known, learning }
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}
