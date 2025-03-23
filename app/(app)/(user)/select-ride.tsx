import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getRides, RideResponse, SearchRideRequest } from '@/services/ride';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { RideCard } from '@/components/RideCard';
import { CarpoolMap } from '@/components/CarpoolMap';
import { useLocation } from '@/store/LocationContext';
import AppActivityIndicator from '@/components/AppActivityIndicator/AppActivityIndicator';
import { MapMarkerProps } from 'react-native-maps';

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

    const fetchRides = async () => {
        const request: SearchRideRequest = {
            userLat: parseFloat(params.userLat),
            userLng: parseFloat(params.userLng),
            destLat: parseFloat(params.destLat),
            destLng: parseFloat(params.destLng),
            departureDatetime: new Date(params.departureDatetime)
        };
        const response = await getRides(request);
        setRides(response.content);
        if (response.content.length > 0) {
            setSelected(response.content[0]);
        }
    }


    const handleSelected = (ride: RideResponse) => {
        setSelected(ride);
    }

    React.useEffect(() => {
        fetchRides();
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

    if (location === null) {
        return <AppActivityIndicator />
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

const styles = StyleSheet.create({
    carousel: {
        paddingVertical: 10,
    },
})