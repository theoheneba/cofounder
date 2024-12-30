import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import type { User } from '../types';

export function useProfiles() {
  const [profiles, setProfiles] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    async function fetchProfiles() {
      try {
        // Simplified query to avoid join issues
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id,
            email,
            full_name,
            professional_title,
            bio,
            skills,
            location,
            startup_id
          `)
          .neq('id', user?.id);

        if (error) throw error;

        // If we need startup data, fetch it separately
        if (data) {
          const startupIds = data
            .map(profile => profile.startup_id)
            .filter(Boolean);

          if (startupIds.length > 0) {
            const { data: startups } = await supabase
              .from('startups')
              .select('*')
              .in('id', startupIds);

            // Merge startup data with profiles
            const profilesWithStartups = data.map(profile => ({
              ...profile,
              startup: startups?.find(s => s.id === profile.startup_id)
            }));

            setProfiles(profilesWithStartups);
          } else {
            setProfiles(data);
          }
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [user]);

  return { profiles, loading };
}