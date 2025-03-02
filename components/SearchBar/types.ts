export interface SearchBarProps {
    placeholder: string;
    onLocationSelect: (latitude: number, longitude: number) => void;
    currentPosition?: { latitude: number; longitude: number };
}
