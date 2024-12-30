import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import type { Startup } from '../types';

export function useStartup() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const createStartup = async (data: Partial<Startup>) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('startups')
        .insert([{
          ...data,
          user_id: user.id,
        }]);

      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createStartup,
    loading,
  };
}