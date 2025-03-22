import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const BookingsView = () => {
    const theme = useTheme();
    const [loading, setLoading] = React.useState(true);
    const [requests, setRequests] = React.useState([]);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar style='auto' />
            <Text variant='titleMedium'>Passenger Requests</Text>
        </View>
  )
}

export default BookingsView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
})