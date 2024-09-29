// src/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export interface UserSession {
  exp: number;
  userId: string;
  username: string;
  // Add any additional fields you expect in the token
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextProps {
  session: UserSession | null;
  status: AuthStatus; // Use type for better safety
  logout: () => void; // Add logout to the context
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (token) {
        try {
          const decoded = jwtDecode<UserSession>(token); // Decode without verifying

          // Check token expiration
          if (decoded.exp * 1000 > Date.now()) {
            setSession(decoded);
            setStatus('authenticated');
          } else {
            setStatus('unauthenticated'); // Token expired
            localStorage.removeItem('token'); // Clear invalid token
          }
        } catch (err) {
          console.error('Token decoding error:', err);
          setStatus('unauthenticated');
          localStorage.removeItem('token'); // Clear invalid token from localStorage
        }
      } else {
        setStatus('unauthenticated'); // No token means user is unauthenticated
      }
    };

    checkToken();

    // Set up a periodic check for token expiration
    const intervalId = setInterval(() => {
      checkToken();
    }, 5000); // Check every 5 seconds

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    setSession(null); // Clear user session
    setStatus('unauthenticated'); // Update status to unauthenticated
  };

  return (
    <AuthContext.Provider value={{ session, status, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
