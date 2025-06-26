'use client';
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/lib/supabase-browser';

type AuthContextType = { user: User | null; };

const AuthContext = createContext<AuthContextType>({ user: null });
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children, initialUser }: { children: ReactNode; initialUser: User | null; }) {
  const [user, setUser] = useState<User | null>(initialUser);
  useEffect(() => {
    const supabase = supabaseBrowser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
