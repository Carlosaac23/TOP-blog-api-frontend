import type { ReactNode } from 'react';

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';

import type { AuthContextType, AuthUser } from '@/types';

import { getProfile } from '@/lib/getProfile';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const loadProfile = useCallback(async () => {
    const token = localStorage.getItem('bloggering_token');

    if (!token) {
      setAuth(null);
      return;
    }

    const profile = await getProfile();
    setAuth(profile);
  }, []);

  const refreshAuth = useCallback(async () => {
    try {
      await loadProfile();
    } catch (error: any) {
      localStorage.removeItem('bloggering_token');
      setAuth(null);
      toast.error(error.response?.data?.message ?? 'Sesion expired');
    }
  }, [loadProfile]);

  const signIn = useCallback(async (token: string) => {
    localStorage.setItem('bloggering_token', token);
    const profile = await getProfile();
    setAuth(profile);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('bloggering_token');
    setAuth(null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const boot = async () => {
      try {
        await refreshAuth();
      } finally {
        if (isMounted) setLoadingAuth(false);
      }
    };

    void boot();

    return () => {
      isMounted = false;
    };
  }, [refreshAuth]);

  const value = useMemo(
    () => ({ auth, loadingAuth, refreshAuth, signIn, logOut }),
    [auth, loadingAuth, refreshAuth, signIn, logOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
