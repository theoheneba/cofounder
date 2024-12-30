import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export function useProfile(id?: string) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuthStore();
  const isOwnProfile = id ? user?.id === id : true;
  const profileId = id || user?.id;

  useEffect(() => {
    if (!profileId) return;

    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setProfile(data);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [profileId]);

  const updateProfile = async (data: any) => {
    if (!user) throw new Error('Not authenticated');
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...data,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      
      setProfile(prev => ({ ...prev, ...data }));
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    profile, 
    isOwnProfile,
    updateProfile,
    loading,
    error
  };
}