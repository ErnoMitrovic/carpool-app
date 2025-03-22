import httpInstance from "./httpInstance"

export interface LocationPojo {
    x: number;
    y: number;
}

export interface CreateRideRequest {
    departureDatetime: Date;
    availableSeats: number;
    costPerSeat: number;
    startLocation: LocationPojo;
    endLocation: LocationPojo;
    rideDescription: string;
}

export interface RideResponse {
    id: number;
    departureTime: string;
    startLocation: LocationPojo;
    endLocation: LocationPojo;
    seats: number;
    price: number;
}

export const getMyRides = async (userId: string, page: number, limit: number) => {
    const response = await httpInstance.get<RideResponse[]>(`/ride/${userId}`, {
        params: {
            page, limit
        }
    });

    return response.data;
}

export const createRide = async (ride: CreateRideRequest) => {
    const response = await httpInstance.post<RideResponse>('/ride', ride);

    return response.data;
}