import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthStore();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        // Fetch user role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();

        setUser(session.user, profile?.role);
        
        // Only redirect if not already on an onboarding page
        if (!location.pathname.startsWith('/onboarding')) {
          if (profile?.role === 'admin' || profile?.role === 'super_admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Fetch user role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();

        setUser(session.user, profile?.role);

        // Check onboarding status
        const { data: progress } = await supabase
          .from('onboarding_progress')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (profile?.role === 'admin' || profile?.role === 'super_admin') {
          navigate('/admin');
        } else if (!progress || !progress.profile_completed) {
          navigate('/onboarding/profile');
        } else if (!progress.startup_completed) {
          navigate('/onboarding/startup');
        } else if (!progress.preferences_completed) {
          navigate('/onboarding/preferences');
        } else {
          navigate('/dashboard');
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, setUser, location.pathname]);

  return <>{children}</>;
}