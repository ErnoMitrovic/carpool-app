import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleMaps } from 'expo-maps'
import { Marker } from 'expo-maps/build/google/GoogleMaps.types'
import { getCurrentPositionAsync, getLastKnownPositionAsync, LocationObject, useBackgroundPermissions, useForegroundPermissions } from 'expo-location'

const CarpoolMap = () => {
    const [location, setLocation] = useState<Marker | null>(null)
    const [status, setStatus] = useForegroundPermissions();

    useEffect(() => {
        if (status?.granted) {
            getCurrentPositionAsync().then((location) => {
                setLocation({
                    coordinates: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }
                })
            });
        }
    }, [status]);

    return (
        <View style={styles.container}>
            <GoogleMaps.View style={styles.map} markers={location ? [location] : []} />
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