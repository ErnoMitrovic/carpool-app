import { getAuth, signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth";
import httpInstance from "./httpInstance"

export enum Role {
    DRIVER = 'DRIVER',
    USER = 'USER'
}

export interface AuthResponse {
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignUpRequest extends LoginRequest {
    name: string;
    phone: string;
    universityId: number;
}

export const signUp = async (credentials: SignUpRequest, role: Role) => {
    const auth = getAuth();
    const response = await httpInstance.post<AuthResponse>(`/auth/${role.toLowerCase()}`, credentials);
    const { token } = response.data;
    await signInWithCustomToken(auth, token);
}

export const signIn = async (credentials: LoginRequest) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
}

export const signOut = async () => {
    const auth = getAuth();
    await auth.signOut();
}