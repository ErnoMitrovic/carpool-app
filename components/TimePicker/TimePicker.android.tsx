import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { TimePickerProps } from './types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-paper'

const TimePicker: FC<TimePickerProps> = () => {
    return (
        <SafeAreaView>
            <Button>Select date</Button>
            <Button>Select time</Button>
        </SafeAreaView>
    )
}

export default TimePicker

const styles = StyleSheet.create({})