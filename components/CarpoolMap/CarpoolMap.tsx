import { StyleSheet, useColorScheme, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { CarpoolMapProps } from './types';
import { darkMapStyle } from '../ui/CarpoolTheme';

const CarpoolMap: FC<CarpoolMapProps> = ({ initialRegion, markers, currentRegion }) => {
    const [loaded, setLoaded] = useState(false);
    const mapRef = useRef<MapView>(null);
    const colorScheme = useColorScheme();

    useEffect(() => {
        if (initialRegion) {
            setLoaded(true);
        }
    }, [initialRegion]);

    useEffect(() => {
        if (currentRegion && mapRef.current) {
            mapRef.current.animateToRegion(currentRegion);
            mapRef.current.animateCamera({ center: currentRegion });
        }
    }, [currentRegion]);

    return (
        <View style={styles.container}>
            {loaded && <MapView style={styles.map}
                followsUserLocation={true}
                showsUserLocation={true}
                loadingEnabled={true}
                initialRegion={initialRegion}
                region={currentRegion}
                ref={mapRef}
                userInterfaceStyle={colorScheme === 'dark' ? 'dark' : 'light'}
                customMapStyle={colorScheme === 'dark' ? darkMapStyle : []}>
                {markers.map((marker, index) => (
                    <Marker
                        key={marker.id || index}
                        coordinate={marker.coordinate}
                    />
                ))}
            </MapView>}
        </View>
    )
}

export default CarpoolMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
})