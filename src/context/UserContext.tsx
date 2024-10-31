import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connectToDatabase } from '../lib/mongodb'; // Adjust the import path if necessary
import { User } from '../models/User';

interface UserContextType {
  user: User | null;
  loading: boolean; // Add loading state
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await connectToDatabase(); // Ensure database connection
        const response = await fetch('/api/users/me'); // Adjust endpoint as needed
        if (response.ok) {
          const data: User = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
