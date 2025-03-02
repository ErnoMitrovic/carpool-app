import axios from "axios";
import Constants from 'expo-constants';

/**
 * This is an isolated service that fetches autocomplete suggestions from the server.
 * 
 * Not use in mass production, just for cheap prototyping.
 */

const HERE_KEY = Constants.expoConfig?.extra?.hereApiKey;

export type LocationItem = {
    title: string;
    position: {
        lat: number;
        lng: number;
    }
    id: string;
}

export const getSuggestions = async (query: string, currentLocation: string) => {
    try {
        const response = await axios.get('https://autosuggest.search.hereapi.com/v1/autosuggest', {
            params: {
                apiKey: HERE_KEY,
                q: query,
                at: currentLocation,
                limit: 5
            }
        })
        return response.data.items as LocationItem[];
    } catch (error) {
        console.error(error);
        return [];
    }
}