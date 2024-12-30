import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useSuperAdmin() {
  const [loading, setLoading] = useState(false);

  const promoteToAdmin = async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);

      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  const demoteFromAdmin = async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'user' })
        .eq('id', userId);

      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    promoteToAdmin,
    demoteFromAdmin,
    loading
  };
}