import { StyleSheet, useColorScheme, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { CarpoolMapProps } from './types';
import { darkMapStyle } from '../ui/CarpoolTheme';
import Constants from 'expo-constants';
import MapViewDirections from 'react-native-maps-directions';
import { useTheme } from 'react-native-paper';

const CarpoolMap: FC<CarpoolMapProps> = ({ initialRegion, markers, routePoints }) => {
    const MAPS_API_KEY = Constants.expoConfig?.android?.config?.googleMaps?.apiKey;

    const [loaded, setLoaded] = useState(false);
    const mapRef = useRef<MapView>(null);
    const colorScheme = useColorScheme();
    const theme = useTheme();

    const origin = React.useMemo(() => {
        if (!routePoints || routePoints.length < 2) return null;
        return routePoints[0].coordinate;
    }, [routePoints?.[0]?.coordinate?.latitude, routePoints?.[0]?.coordinate?.longitude]);

    const destination = React.useMemo(() => {
        if (!routePoints || routePoints.length < 2) return null;
        return routePoints[1].coordinate;
    }, [routePoints?.[1]?.coordinate?.latitude, routePoints?.[1]?.coordinate?.longitude]);

    useEffect(() => {
        if (initialRegion) {
            setLoaded(true);
        }
    }, [initialRegion]);

    useEffect(() => {
        if (mapRef.current && markers.length > 0 && loaded) {
            mapRef.current.fitToCoordinates(
                markers.map(m => m.coordinate),
                {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    animated: true,
                }
            );
        }
    }, [markers, loaded]);

    if (loaded) {
        return (
            <MapView style={styles.map}
                followsUserLocation={true}
                showsUserLocation={true}
                loadingEnabled={true}
                initialRegion={initialRegion}
                ref={mapRef}
                userInterfaceStyle={colorScheme === 'dark' ? 'dark' : 'light'}
                customMapStyle={colorScheme === 'dark' ? darkMapStyle : []}>
                {markers.map((marker, index) => (
                    <Marker
                        key={marker.id || index}
                        coordinate={marker.coordinate}
                    />
                ))}
                {origin && destination && MAPS_API_KEY && (<MapViewDirections
                    origin={origin}
                    destination={destination}
                    strokeColor={theme.colors.primary}
                    strokeWidth={3}
                    apikey={MAPS_API_KEY}
                />)}
            </MapView>
        )
    }
}

export default CarpoolMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
    }
})