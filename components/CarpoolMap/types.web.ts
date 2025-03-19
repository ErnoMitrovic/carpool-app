// Web-specific types that don't depend on react-native-maps

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MapMarkerProps {
  coordinate: Coordinate;
  id?: string;
}

export interface CarpoolMapProps {
  initialRegion?: Region;
  markers: MapMarkerProps[];
  currentRegion?: Region;
}