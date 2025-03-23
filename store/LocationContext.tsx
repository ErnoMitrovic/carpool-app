import { PositionPojo } from "@/services/ride";
import { getCurrentPositionAsync, getLastKnownPositionAsync, LocationObject, LocationOptions, useForegroundPermissions } from "expo-location";
import { createContext, useContext, useEffect, useState } from "react";

interface LocationContextType {
    location: PositionPojo | null;
    updateLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [location, setLocation] = useState<PositionPojo | null>(null);
    const [status, setStatus] = useForegroundPermissions();

    const updateLocation = async () => {
        if (status?.granted) {
            const location = await getCurrentPositionAsync();
            setLocation({
                x: location.coords.longitude,
                y: location.coords.latitude
            });
        } else {
            await setStatus();
        }
    }

    useEffect(() => {
        updateLocation();
    }, [status]);

    return (
        <LocationContext.Provider value={{ location, updateLocation }}>
            {children}
        </LocationContext.Provider>
    )
}

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
}