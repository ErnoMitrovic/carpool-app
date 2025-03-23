import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { MD3Colors, ThemeProp } from "react-native-paper/lib/typescript/types";

const lightColors: MD3Colors = {
    primary: '#4CAF50',
    primaryContainer: '#DDEFD9',
    secondary: '#2196F3',
    secondaryContainer: '#E3F2FD',
    tertiary: '#FFB74D',
    tertiaryContainer: '#FFF3E0',

    surface: '#FFFBFE',
    surfaceVariant: '#E7E0EC',
    surfaceDisabled: 'rgba(28, 27, 31, 0.12)',

    background: '#FFFBFE',

    error: '#E57373',
    errorContainer: '#FCD8DC',

    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#00210E',

    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#001F2D',

    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#2A1800',

    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454F',
    onSurfaceDisabled: 'rgba(28, 27, 31, 0.38)',

    onError: '#FFFFFF',
    onErrorContainer: '#410002',

    onBackground: '#1C1B1F',

    outline: '#79747E',
    outlineVariant: '#CAC4D0',

    inverseSurface: '#313033',
    inverseOnSurface: '#F5F5F5',
    inversePrimary: '#A8D5A9',

    shadow: '#000000',
    scrim: '#000000',

    backdrop: 'rgba(63, 63, 70, 0.4)',

    elevation: {
        level0: 'transparent',
        level1: 'rgb(247, 243, 249)',
        level2: 'rgb(243, 237, 246)',
        level3: 'rgb(238, 232, 244)',
        level4: 'rgb(236, 230, 243)',
        level5: 'rgb(233, 227, 241)',
    }
}

export const lightTheme: ThemeProp = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...lightColors,
    }
}

export const SharedUniMD3DarkColors: MD3Colors = {
    primary: '#A8D5A9',              
    primaryContainer: '#265D2E',     
    secondary: '#90CAF9',            
    secondaryContainer: '#255E8B',   
    tertiary: '#FFE0B2',             
    tertiaryContainer: '#7E5700',    
  
    surface: '#1C1B1F',              
    surfaceVariant: '#49454F',       
    surfaceDisabled: 'rgba(228, 225, 229, 0.12)',
  
    background: '#121212',
  
    error: '#F28B82',                
    errorContainer: '#8C1D18',       
  
    onPrimary: '#003914',            
    onPrimaryContainer: '#DDEFD9',   
  
    onSecondary: '#002B4C',          
    onSecondaryContainer: '#E3F2FD',
  
    onTertiary: '#422C00',
    onTertiaryContainer: '#FFF3E0',
  
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    onSurfaceDisabled: 'rgba(228, 225, 229, 0.38)',
  
    onError: '#601410',
    onErrorContainer: '#FCD8DC',
  
    onBackground: '#E6E1E5',
  
    outline: '#938F99',
    outlineVariant: '#49454F',
  
    inverseSurface: '#E6E1E5',
    inverseOnSurface: '#1C1B1F',
    inversePrimary: '#4CAF50',
  
    shadow: '#000000',
    scrim: '#000000',
  
    backdrop: 'rgba(63, 63, 70, 0.4)',
  
    elevation: {
      level0: 'transparent',
      level1: 'rgb(35, 34, 39)',
      level2: 'rgb(44, 42, 50)',
      level3: 'rgb(52, 50, 59)',
      level4: 'rgb(55, 53, 62)',
      level5: 'rgb(58, 56, 67)',
    },
  };
  

export const darkTheme: ThemeProp = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...SharedUniMD3DarkColors,
    }
}

export const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
];