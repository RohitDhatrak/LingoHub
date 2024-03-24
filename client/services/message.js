import axios from "axios";
import Constants from "expo-constants";

export async function sendMessage(roomId, receiverId, senderId, body) {
    try {
        const response = await axios.post(
            `${Constants.expoConfig?.extra?.apiEndpoint}/message/${roomId}`,
            { receiverId, senderId, body }
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}
