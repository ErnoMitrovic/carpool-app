import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { TimePickerProps } from './types'
import { Button, useTheme } from 'react-native-paper'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'

type AndroidMode = 'date' | 'time';

const TimePicker: FC<TimePickerProps> = ({ value, onChange }) => {
    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === 'set' && selectedDate) {
            onChange(selectedDate); 
        }
    };

    const showMode = (currentMode: AndroidMode) => {
        DateTimePickerAndroid.open({
            value,
            onChange: handleChange,
            mode: currentMode,
            is24Hour: true,
        })
    }

    const showDatepicker = () => {
        showMode('date')
    }

    const showTimepicker = () => {
        showMode('time')
    }

    return (
        <View style={styles.container}>
            <Button mode='outlined' onPress={showDatepicker}>Select date</Button>
            <Button mode='outlined' onPress={showTimepicker}>Select time</Button>
        </View>
    )
}

export default TimePicker

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    }
})