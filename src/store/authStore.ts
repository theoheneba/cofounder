import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  userRole: 'user' | 'admin' | 'super_admin' | null;
  loading: boolean;
  setUser: (user: User | null, role?: string) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userRole: null,
  loading: false,
  setUser: (user, role) => set({ user, userRole: role as AuthState['userRole'] }),
  signIn: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // Fetch user role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();

      set({ 
        user: data.user,
        userRole: profile?.role as AuthState['userRole'] || 'user',
        loading: false
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  signUp: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: email === 'theohenebasa@gmail.com' ? 'super_admin' : 'user'
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            full_name: email.split('@')[0],
            role: email === 'theohenebasa@gmail.com' ? 'super_admin' : 'user'
          }]);
        
        if (profileError) throw profileError;
      }
      
      set({ 
        user: data.user,
        userRole: email === 'theohenebasa@gmail.com' ? 'super_admin' : 'user',
        loading: false
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  signOut: async () => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, userRole: null, loading: false });
      window.location.href = '/login';
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  resendVerification: async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    if (error) throw error;
  },
}));