import { MapMarkerProps, Region } from "react-native-maps";

export interface CarpoolMapProps {
    initialRegion?: Region;
    markers: MapMarkerProps[];
}