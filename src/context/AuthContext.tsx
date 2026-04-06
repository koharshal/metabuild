import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LOCAL_ADMIN_SESSION_KEY = 'metabuild_local_admin_session';
const LOCAL_ADMIN_USERNAME = 'metabuild';
const LOCAL_ADMIN_PASSWORD = 'Metabuild@99';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      const hasLocalAdminSession =
        typeof window !== 'undefined' && localStorage.getItem(LOCAL_ADMIN_SESSION_KEY) === 'true';
      setIsAuthenticated(Boolean(data.session) || hasLocalAdminSession);
      setIsLoading(false);
    };

    bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const hasLocalAdminSession =
        typeof window !== 'undefined' && localStorage.getItem(LOCAL_ADMIN_SESSION_KEY) === 'true';
      setIsAuthenticated(Boolean(session) || hasLocalAdminSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const identifier = email.trim();

    if (identifier === LOCAL_ADMIN_USERNAME && password === LOCAL_ADMIN_PASSWORD) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_ADMIN_SESSION_KEY, 'true');
      }
      setIsAuthenticated(true);
      return true;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: identifier, password });
    if (!error && typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
    }
    return !error;
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
    }
    await supabase.auth.signOut();
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      login,
      logout,
    }),
    [isAuthenticated, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
