import axios from "axios";
import Constants from "expo-constants";

export async function createUser(email, name) {
    try {
        const response = await axios.post(
            `${Constants.manifest?.extra?.apiEndpoint}/user/${email}`,
            { name }
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export async function getUser(email) {
    try {
        const response = await axios.get(
            `${Constants.manifest?.extra?.apiEndpoint}/user/${email}`
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export async function getUsers(email) {
    try {
        const response = await axios.get(
            `${Constants.manifest?.extra?.apiEndpoint}/user`
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}
