import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export interface UserSession {
  exp: number;
  userId: string;
  username: string;
}
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextProps {
  session: UserSession | null;
  status: AuthStatus; 
  logout: () => void; 
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token'); 

      if (token) {
        try {
          const decoded = jwtDecode<UserSession>(token);           
          if (decoded.exp * 1000 > Date.now()) {
            setSession(decoded);
            setStatus('authenticated');
          } else {
            setStatus('unauthenticated'); 
            localStorage.removeItem('token'); 
          }
        } catch (err) {
          console.error('Token decoding error:', err);
          setStatus('unauthenticated');
          localStorage.removeItem('token'); 
        }
      } else {
        setStatus('unauthenticated'); 
      }
    };
    checkToken();
    const intervalId = setInterval(checkToken, 5000); 

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('token'); 
    setSession(null); 
    setStatus('unauthenticated'); 
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
  return context;};