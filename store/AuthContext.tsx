import React from 'react'
import { Role } from '@/services/auth'
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

interface AuthContextProps {
    role?: Role;
    setRole: (role: Role | undefined) => void;
    isSignedIn: boolean;
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
    const [role, setRole] = React.useState<Role>();
    const [isSignedIn, setIsSignedIn] = React.useState(false);

    const handleUserChange = async (user: User | null) => {
        if (user) {
            setIsSignedIn(true);
            const tokenData = await user.getIdTokenResult();
            const role = tokenData.claims.role as Role;
            setRole(role);
        } else {
            setRole(undefined);
            setIsSignedIn(false);
        }
    }

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleUserChange);
        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider {...props} value={{ role, setRole, isSignedIn }} />
}

export { AuthProvider, useAuth };