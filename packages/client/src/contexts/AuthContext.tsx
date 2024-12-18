'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { apiClient } from '../utils/apiClient';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  role: 'user' | 'admin' | null;
  media: string | null;
  fetchUser: () => void;
  setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [media, setMedia] = useState<string | null>(null);
  const [role, setRole] = useState<'user' | 'admin' | null>(null);

  const fetchUser = async () => {
    try {
      console.log('fetchUser called');
      await apiClient.post(
        '/auth/refresh-token',
        {},
        { withCredentials: true }
      );
      const response = await apiClient.get('/auth/me');
      if (response.status === 200) {
        console.log('User fetched:', response.data.data);
        setIsLoggedIn(true);
        setUserId(response.data.data._id);
        setRole(response.data.data.role);
        setMedia(response.data.data.media);
      }
    } catch (error) {
      console.error('fetchUser error:', error);
    }
  };

  useEffect(() => {
    console.log('AuthProvider mounted');
  }, []);

  useEffect(() => {
    fetchUser();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userId, role, setIsLoggedIn, media, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};
