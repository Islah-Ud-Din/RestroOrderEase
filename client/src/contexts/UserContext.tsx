'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
type UserContextType = {
    user: object | null;
    authToken: string | null;
    setUser: (user: object) => void;
    setAuthToken: (token: string | null) => void;
    logout: () => void;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null); // Store auth token
    const logout = () => {
        setUser(null);
        setAuthToken(null);
    };
    console.log('User in context:', user);

    return <UserContext.Provider value={{ user, authToken, setUser, setAuthToken, logout }}>{children}</UserContext.Provider>;
};

// Custom hook for using the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
