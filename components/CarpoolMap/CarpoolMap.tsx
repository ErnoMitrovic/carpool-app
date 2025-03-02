import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import MapView, { Marker, Region } from 'react-native-maps';
import { CarpoolMapProps } from './types';

const CarpoolMap: FC<CarpoolMapProps> = ({ initialRegion, markers }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (initialRegion) {
            setLoaded(true);
        }
    }, [initialRegion]);

    return (
        <View style={styles.container}>
            {loaded && <MapView style={styles.map}
                followsUserLocation={true}
                showsUserLocation={true}
                loadingEnabled={true}
                initialRegion={initialRegion}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
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