import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const AppActivityIndicator = () => {
    const theme = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]} >
            <ActivityIndicator size='large' />
        </View>
    )
}

export default AppActivityIndicator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})