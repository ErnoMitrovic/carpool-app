import { Position } from "@/services/autocomplete";

export interface SearchBarProps {
    placeholder: string;
    onLocationSelect: (locaiton: Position) => void;
    currentPosition?: { latitude: number; longitude: number };
}
