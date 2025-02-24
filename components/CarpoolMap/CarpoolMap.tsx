import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { getCurrentPositionAsync, useForegroundPermissions } from 'expo-location'
import MapView, { Region } from 'react-native-maps';

const CarpoolMap = () => {
    const [status, setStatus] = useForegroundPermissions();
    const [region, setRegion] = useState<Region>();
    const mapRef = useRef<MapView>(null); // Reference to the MapView

    useEffect(() => {
        const getLocation = async () => {
            if (status?.granted) {
                const location = await getCurrentPositionAsync();
                const newRegion = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01, // Smaller delta for a closer zoom
                    longitudeDelta: 0.01
                };

                setRegion(newRegion);

                // Animate map to user location
                if (mapRef.current) {
                    mapRef.current.animateToRegion(newRegion, 1000);
                }
            } else {
                setStatus();
            }
        };

        getLocation();
    }, [status]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef} // Attach reference to MapView
                style={styles.map}
                showsUserLocation={true}
                loadingEnabled={true}
                region={region} // Dynamically update region
            />
        </View>
    );
};

export default CarpoolMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});