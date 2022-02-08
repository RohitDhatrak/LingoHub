import axios from "axios";
import Constants from "expo-constants";

export async function getChatRooms(userId) {
    try {
        const response = await axios.get(
            `${Constants.manifest?.extra?.apiEndpoint}/room/${userId}`
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}
