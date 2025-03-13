import axios from "axios";
import Constants from 'expo-constants';

/**
 * This is an isolated service that fetches autocomplete suggestions from the server.
 * 
 * Not use in mass production, just for cheap prototyping.
 */

const HERE_KEY = Constants.expoConfig?.extra?.here?.apiKey;
const BASE_URL = Constants.expoConfig?.extra?.here?.autosuggestUrl;

export type LocationItem = {
    title: string;
    position: Position;
    id: string;
}

export type Position = {
    lat: number;
    lng: number;
}

export const getSuggestions = async (query: string, currentLocation: string) => {
    try {
        const response = await axios.get(BASE_URL, {
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