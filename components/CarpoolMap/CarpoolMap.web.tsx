import { StyleSheet, View, Text } from 'react-native'
import React, { FC } from 'react'
import { CarpoolMapProps } from './types';

// Web fallback component for CarpoolMap
const CarpoolMap: FC<CarpoolMapProps> = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Maps are only available on mobile devices
            </Text>
        </View>
    )
}

export default CarpoolMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 16,
        color: '#333',
    }
})