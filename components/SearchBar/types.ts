import { Position } from "@/services/autocomplete/getSuggestions";

export interface SearchBarProps {
    placeholder: string;
    onLocationSelect: (locaiton: Position) => void;
    currentPosition?: { latitude: number; longitude: number };
}
