import Constants from 'expo-constants';

export const API_URL = process.env.EXPO_PUBLIC_API_URL || `http://${Constants.expoConfig?.hostUri?.split(':')[0]}:8080/api/1.0.0`;