import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useVerifyUser() {
  const [loading, setLoading] = useState(false);

  const verifyUser = async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_verified: true })
        .eq('id', userId);

      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  return { verifyUser, loading };
}