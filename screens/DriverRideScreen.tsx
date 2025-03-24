import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator, Button, HelperText, Snackbar, Surface, Text, TextInput } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'
import { MapMarkerProps } from 'react-native-maps'
import { RideRequest, LocationPojo } from '@/services/ride'
import { TimePicker } from '@/components/TimePicker'
import { SearchBar } from '@/components/SearchBar'
import { CarpoolMap } from '@/components/CarpoolMap'
import { useLocation } from '@/store/LocationContext'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface DriverRideScreenProps {
    defaultValues?: RideRequest
    onSubmit: (data: RideRequest) => Promise<void>
    onDismiss?: () => void
    submitText: string
}

const DriverRideScreen: React.FC<DriverRideScreenProps> = ({
    defaultValues = {
        departureDatetime: new Date(),
        availableSeats: 1,
        costPerSeat: 0,
    },
    onSubmit,
    onDismiss,
    submitText
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<RideRequest>(
        {
            defaultValues
        }
    );

    const [startMarker, setStartMarker] = React.useState<MapMarkerProps | null>(null);
    const [endMarker, setEndMarker] = React.useState<MapMarkerProps | null>(null);
    const [snackbarVisible, setSnackbarVisible] = React.useState(false);
    const { location } = useLocation();
    const { top } = useSafeAreaInsets();

    const onSubmitForm = async (data: RideRequest) => {
        await onSubmit(data);
        setSnackbarVisible(true);
    }

    const onDismissSnackBar = () => {
        setSnackbarVisible(false);
        onDismiss && onDismiss();
    }

    if (!location) {
        return <ActivityIndicator size="large" style={styles.container} />
    }

    return (
        <>
            <StatusBar hidden={true} />
            <Surface style={{ paddingVertical: top, paddingHorizontal: 10 }}>
                <Controller
                    name='startLocation'
                    control={control}
                    rules={{ required: 'This field is required' }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <SearchBar
                                query={value?.name}
                                setQuery={onChange}
                                currentPosition={{
                                    latitude: location?.y,
                                    longitude: location?.x
                                }} placeholder='Start location' onLocationSelect={loc => {
                                    setStartMarker({
                                        coordinate: {
                                            latitude: loc.position.y,
                                            longitude: loc.position.x
                                        }
                                    });
                                    onChange(loc)
                                }} />
                            <HelperText type='error'>{errors.startLocation?.message}</HelperText>
                        </>
                    )}
                />
                <Controller
                    name='endLocation'
                    control={control}
                    rules={{ required: 'This field is required' }}
                    render={({ field: { value, onChange } }) => (
                        <>
                            <SearchBar
                                query={value?.name}
                                setQuery={onChange}
                                currentPosition={{
                                    latitude: location?.y,
                                    longitude: location?.x
                                }} placeholder='End location' onLocationSelect={loc => {
                                    setEndMarker({
                                        coordinate: {
                                            latitude: loc.position.y,
                                            longitude: loc.position.x
                                        }
                                    });
                                    onChange(loc)
                                }} />
                            <HelperText type='error'>{errors.endLocation?.message}</HelperText>
                        </>
                    )}
                />
                <Controller
                    control={control}
                    name="departureDatetime"
                    rules={{ required: 'This field is required' }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TimePicker value={value} onChange={onChange} />
                            <HelperText type="error" visible={errors.departureDatetime !== undefined}>
                                {errors.departureDatetime?.message}
                            </HelperText>
                        </>
                    )}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Controller
                        control={control}
                        name="availableSeats"
                        rules={{ required: 'This field is required', min: { value: 1, message: 'Minimum 1 seat' } }}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <View>
                                <TextInput
                                    label="Seats"
                                    value={value + ''}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    keyboardType='numeric'
                                    left={<TextInput.Icon icon='seat' />}
                                />
                                <HelperText type="error" visible={errors.availableSeats !== undefined}>
                                    {errors.availableSeats?.message}
                                </HelperText>
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name="costPerSeat"
                        rules={{ required: 'This field is required', min: { value: 0, message: 'The price has to be positive' } }}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <View >
                                <TextInput
                                    label="Price"
                                    value={value + ''}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    keyboardType='numeric'
                                    left={<TextInput.Icon icon='currency-usd' />}
                                />
                                <HelperText type="error" visible={errors.costPerSeat !== undefined}>
                                    {errors.costPerSeat?.message}
                                </HelperText>
                            </View>
                        )}
                    />
                </View>
                <Controller
                    control={control}
                    name="rideDescription"
                    rules={{ required: 'This field is required' }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <>
                            <TextInput
                                label="Description"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                numberOfLines={3}
                            />
                            <HelperText type="error" visible={errors.rideDescription !== undefined}>
                                {errors.rideDescription?.message}
                            </HelperText>
                        </>
                    )}
                />
                <Button mode='contained' disabled={!isValid} onPress={handleSubmit(onSubmitForm)}>{submitText}</Button>
            </Surface>

            <CarpoolMap markers={[startMarker, endMarker].filter(marker => marker !== null) as MapMarkerProps[]}
                initialRegion={{
                    latitude: location?.y,
                    longitude: location?.x,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }} />

            <Snackbar
                visible={snackbarVisible}
                onDismiss={onDismissSnackBar}
                duration={3000}
            >
                Form submitted successfully!
            </Snackbar>
        </>
    )
}

export default DriverRideScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})