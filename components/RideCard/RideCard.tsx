import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { RideCardProps } from './types'
import { Button, Card, Paragraph } from 'react-native-paper';

const RideCard: React.FC<RideCardProps> = ({ ride, onSelect }) => {
    const { width } = useWindowDimensions();

    return (
        <Card style={[styles.container, { width: width - 32 }]} >
            <Card.Title title={ride.endLocation.name} />
            <Card.Content>
                <Paragraph>From: {ride.startLocation.name}</Paragraph>
                <Paragraph>To: {ride.endLocation.name}</Paragraph>
                <Paragraph>Departure: {ride.departureDatetime}</Paragraph>
                <Paragraph>Seats: {ride.seats} | Price: {ride.price}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button mode='contained' onPress={() => onSelect(ride)} >Book</Button>
            </Card.Actions>
        </Card>
    )
}

export default RideCard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
    }
})