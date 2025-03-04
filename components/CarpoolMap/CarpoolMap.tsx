import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import MapView, { Marker, Region } from 'react-native-maps';
import { CarpoolMapProps } from './types';

const CarpoolMap: FC<CarpoolMapProps> = ({ initialRegion, markers, currentRegion }) => {
    const [loaded, setLoaded] = useState(false);
    const mapRef = useRef<MapView>(null);

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
            >
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
})