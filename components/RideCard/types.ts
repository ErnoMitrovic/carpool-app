import { RideResponse } from "@/services/ride";

export interface RideCardProps {
    ride: RideResponse;
    onSelect: (ride: RideResponse) => void;
}