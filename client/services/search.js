import axios from "axios";
import Constants from "expo-constants";

export async function getSearchData(query) {
    try {
        const response = await axios.post(
            `${Constants.manifest?.extra?.apiEndpoint}/search`,
            { query }
        );
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}
