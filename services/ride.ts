import httpInstance from "./httpInstance";

interface RideRequestParams {
    userLat: number;
    userLng: number;
    destLat: number;
    destLng: number;
    departureDateTime: string;
    radius?: number;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface RideResponse {
    id: number;
    departureTime: string;
    startLocation: {
        lat: number;
        lng: number;
    };
    endLocation: {
        lat: Location;
        lng: Location;
    };
    seats: number;
    price: number;
}

export const getRides = async (params: RideRequestParams) => {
    try {
        const response = await httpInstance.get<RideResponse[]>('/ride', {
            params
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}