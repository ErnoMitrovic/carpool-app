import { Position } from "@/services/autocomplete";
import { LocationPojo } from "@/services/ride";

export interface SearchBarProps {
    placeholder: string;
    onLocationSelect: (location: LocationPojo) => void;
    currentPosition: { latitude: number; longitude: number };
    query: string;
    setQuery: (query: string) => void;
}