import type { ReactNode } from 'react';

import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { AuthContextType } from '@/types';

import { axiosClient } from '@/config/axios';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState({});

  async function authUser() {
    const token = localStorage.getItem('bloggering_token');

    if (!token) {
      setAuth({});
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient('/profile', config);
      console.log('Data from axios:', data);
      setAuth(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      setAuth({});
    }
  }

  useEffect(() => {
    authUser();
  }, []);

  function logOut() {
    localStorage.removeItem('bloggering_token');
    setAuth({});
  }

  return <AuthContext.Provider value={{ auth, logOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
