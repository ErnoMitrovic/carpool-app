import { PageableResponse } from ".";
import httpInstance from "./httpInstance";

export enum BookingStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

export interface BookingRequest {
    statusValue: BookingStatus;
    rideId: number;
    page?: number;
    size?: number;
}

export interface BookingResponse {
    bookingId: number;
    rideId: number;
    username: string;
    userRole: string;
    bookingStatus: string;
    rideStatus: string;
}

export const getBookings = async (request: BookingRequest) => {
    const { statusValue, rideId, page, size } = request;

    const response = await httpInstance.get<PageableResponse<BookingResponse>>(`/ride/${rideId}/booking`, {
        params: {
            statusValue,
            page,
            size
        }
    });

    return response.data;
}

export const bookRide = async (rideId: number) => {
    const response = await httpInstance.post(`/ride/${rideId}/booking`);
    return response.data;
}

export const setBookingStatus = async (rideId: number, bookingId: number, status: BookingStatus) => {
    const response = await httpInstance.put(`ride/${rideId}/booking/${bookingId}`, {
        status
    });
    return response.data;
}