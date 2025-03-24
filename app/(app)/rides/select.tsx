import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getRides, RideResponse, SearchRideRequest } from '@/services/ride';
import { Appbar, Button, Text, TextInput, useTheme } from 'react-native-paper';
import { RideCard } from '@/components/RideCard';
import { CarpoolMap } from '@/components/CarpoolMap';
import { useLocation } from '@/store/LocationContext';
import { AppActivityIndicator } from '@/components/AppActivityIndicator';
import { MapMarkerProps } from 'react-native-maps';
import { bookRide } from '@/services/booking';

type SearchParams = {
    userLat: string;
    userLng: string;
    destLat: string;
    destLng: string;
    departureDatetime: string;
}

const SelectRideView = () => {
    const theme = useTheme();
    const params = useLocalSearchParams<SearchParams>();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const { location } = useLocation();
    const [selected, setSelected] = React.useState<RideResponse>();
    const [rides, setRides] = React.useState<RideResponse[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [radius, setRadius] = React.useState(500);

    const fetchRides = async () => {
        const request: SearchRideRequest = {
            userLat: parseFloat(params.userLat),
            userLng: parseFloat(params.userLng),
            destLat: parseFloat(params.destLat),
            destLng: parseFloat(params.destLng),
            departureDatetime: new Date(params.departureDatetime),
            radius
        };
        try {
            const response = await getRides(request);
            setRides(response.content);
            if (response.content.length > 0) {
                setSelected(response.content[0]);
            }
        } catch (error) {
            setRides([]);
        }
    }


    const handleSelected = async (ride: RideResponse) => {
        await bookRide(ride.id);
        router.navigate('/');
    }

    React.useEffect(() => {
        setLoading(true);
        fetchRides();
        setLoading(false);
    }, [params.userLat, params.userLng, params.destLat, params.destLng, params.departureDatetime])

    const routePoints = React.useMemo(() => {
        if (!selected) return [];
        return [
            {
                id: 'route-start',
                coordinate: {
                    latitude: selected.startLocation.position.y,
                    longitude: selected.startLocation.position.x
                }
            },
            {
                id: 'route-end',
                coordinate: {
                    latitude: selected.endLocation.position.y,
                    longitude: selected.endLocation.position.x
                }
            }
        ];
    }, [selected]);

    const markers = React.useMemo(() => {
        const baseMarkers: MapMarkerProps[] = [
            {
                id: 'start',
                coordinate: {
                    latitude: parseFloat(params.userLat),
                    longitude: parseFloat(params.userLng)
                },
                title: 'Start'
            },
            {
                id: 'end',
                coordinate: {
                    latitude: parseFloat(params.destLat),
                    longitude: parseFloat(params.destLng)
                },
                title: 'End'
            }
        ];

        if (selected) {
            baseMarkers.push(
                {
                    id: 'ride-start',
                    coordinate: {
                        latitude: selected.startLocation.position.y,
                        longitude: selected.startLocation.position.x
                    },
                    title: selected.startLocation.name
                },
                {
                    id: 'ride-end',
                    coordinate: {
                        latitude: selected.endLocation.position.y,
                        longitude: selected.endLocation.position.x
                    },
                    title: selected.endLocation.name
                }
            );
        }

        return baseMarkers;
    }, [params.userLat, params.userLng, params.destLat, params.destLng, selected]);

    if (location === null || loading) {
        return <AppActivityIndicator />
    }

    if (rides.length === 0) {
        return (< >
            <Appbar.Header>
                <Appbar.BackAction onPress={router.back} />
                <Appbar.Content title='Select Ride' />
            </Appbar.Header>
            <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: 15, }}>
                <Text variant='bodyMedium'>No rides available. Try adjusting the radius</Text>
                <TextInput
                    label='Radius'
                    keyboardType='number-pad'
                    value={radius.toString()}
                    onChangeText={value => setRadius(Number(value))}
                    right={<TextInput.Affix text='m' />}
                    style={{ marginVertical: 10 }}
                />
                <Button mode='contained' onPress={fetchRides}>Search</Button>
            </View>
        </>)
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={router.back} />
                <Appbar.Content title='Select Ride' />
            </Appbar.Header>
            <View style={{ backgroundColor: theme.colors.background }}>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={rides}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <RideCard ride={item} onSelect={handleSelected} />}
                    snapToAlignment='start'
                    onScroll={e => {
                        const index = Math.floor(e.nativeEvent.contentOffset.x / (width - 32));
                        if (rides[index]) {
                            setSelected(rides[index]);
                        }
                    }}
                    snapToInterval={width - 32}
                    decelerationRate='fast'
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <CarpoolMap markers={markers} initialRegion={{
                latitude: location?.y,
                longitude: location?.x,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
                routePoints={routePoints} />
        </>
    )
}

export default SelectRideView