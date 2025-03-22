import { Position } from "@/services/autocomplete";

export interface SearchBarProps {
    placeholder: string;
    onLocationSelect: (location: Position) => void;
    currentPosition: { latitude: number; longitude: number };
}
