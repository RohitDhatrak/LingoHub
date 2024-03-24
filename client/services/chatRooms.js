import axios from "axios";
import Constants from "expo-constants";

export async function getChatRooms(userId) {
    try {
        const response = await axios.get(
            `${Constants.expoConfig?.extra?.apiEndpoint}/room/${userId}`
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export async function markAsRead(userId, roomId) {
    try {
        const response = await axios.post(
            `${Constants.expoConfig?.extra?.apiEndpoint}/room/${userId}`,
            { roomId }
        );
        return response.data;
    } catch {
        console.log({ error });
    }
}
