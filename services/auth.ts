import { getItemAsync, setItemAsync, WHEN_UNLOCKED } from "expo-secure-store";
import httpInstance from "./httpInstance"

export enum Role {
    DRIVER = 'DRIVER',
    USER = 'USER'
}

export interface AuthResponse {
    token: string;
    role: Role;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export const signIn = async (requestBody: AuthRequest) => {
    const response = await httpInstance.post<AuthResponse>('/auth/token', requestBody);
    return response.data;
}

export const signUp = async (requestBody: AuthRequest, role: Role) => {
    const response = await httpInstance.post<AuthResponse>(`/auth/${role.toLocaleLowerCase()}`, requestBody);
    return response.data;
}

export const storeToken = async (token: string) => {
    await setItemAsync('token', token, {
        keychainAccessible: WHEN_UNLOCKED
    });
}

export const getToken = async () => {
    return await getItemAsync('token');
}

export const setRole = async (role: Role) => {
    await setItemAsync('role', role, {
        keychainAccessible: WHEN_UNLOCKED
    });
}

export const getRole = async () => {
    return await getItemAsync('role');
}

export const signOut = async () => {
    
}