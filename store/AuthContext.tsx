import React from 'react'
import { Role } from '@/services/auth'
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export interface AppUser {
    uid: string;
    username: string;
    email: string | null;
    displayName: string | null;
    role?: Role;
}

interface AuthContextProps {
    user?: AppUser;
    role?: Role;
    setRole: (role: Role | undefined) => void;
    isSignedIn: boolean;
    isLoaded: boolean;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

const AuthProvider = (props: { children: React.ReactNode }): React.ReactElement => {
    const [user, setUser] = React.useState<AppUser>();
    const [role, setRole] = React.useState<Role>();
    const [isSignedIn, setIsSignedIn] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const handleUserChange = async (firebaseUser: User | null) => {
        if (firebaseUser) {
            setIsSignedIn(true);
            const tokenData = await firebaseUser.getIdTokenResult();
            const role = tokenData.claims.role as Role;
            setRole(role);

            // Create AppUser from Firebase User
            // Using email as username temporarily, in a real app you'd fetch the username from your backend
            const appUser: AppUser = {
                uid: firebaseUser.uid,
                username: firebaseUser.email?.split('@')[0] || firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                role: role
            };
            setUser(appUser);
        } else {
            setUser(undefined);
            setRole(undefined);
            setIsSignedIn(false);
        }
        setIsLoaded(true);
    }

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleUserChange);
        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider {...props} value={{ user, role, setRole, isSignedIn, isLoaded }} />
}

export { AuthProvider, useAuth };