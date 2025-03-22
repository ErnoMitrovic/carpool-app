import { StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const AppActivityIndicator = () => {
    const theme = useTheme();
    return (
        <ActivityIndicator size='large' style={[styles.container, { backgroundColor: theme.colors.background }]} />
    )
}

export default AppActivityIndicator

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})