import { PageableResponse } from ".";
import httpInstance from "./httpInstance"

export interface PositionPojo {
    x: number;
    y: number;
}

export interface LocationPojo {
    position: PositionPojo;
    name: string;
    address: string;
}

export interface RideRequest {
    departureDatetime: Date;
    availableSeats: number;
    costPerSeat: number;
    startLocation: LocationPojo;
    endLocation: LocationPojo;
    rideDescription: string;
    page?: number;
    size?: number;
}

export interface SearchRideRequest {
    userLat: number;
    userLng: number;
    destLat: number;
    destLng: number;
    departureDatetime: Date;
}

export interface RideResponse {
    id: number;
    departureDatetime: string;
    startLocation: LocationPojo;
    endLocation: LocationPojo;
    seats: number;
    price: number;
    status: string;
    description: string;
}

export const getMyRides = async (userId: string, page: number, limit: number, sort?: string) => {
    const response = await httpInstance.get<RideResponse[]>(`/ride/driver/${userId}`, {
        params: {
            page, limit, sort
        }
    });

    return response.data;
}


export const createRide = async (ride: RideRequest) => {
    const response = await httpInstance.post<RideResponse>('/ride', ride);

    return response.data;
}

export const getRide = async (rideId: string) => {
    const response = await httpInstance.get<RideResponse>(`/ride/${rideId}`);
    return response.data;
}

export const updateRide = async (rideId: string, ride: RideRequest) => {
    const response = await httpInstance.put(`/ride/${rideId}`, ride);
    return response.data;
}

export const cancelRide = async (rideId: string) => {
    await httpInstance.delete(`/ride/${rideId}`);
}

export const getRides = async (request: SearchRideRequest) => {
    const response = await httpInstance.get<PageableResponse<RideResponse>>('/ride', {
        params: request
    });
    return response.data;
}