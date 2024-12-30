import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

export function useTeam(startupId: string) {
  const [team, setTeam] = useState<User[]>([]);

  useEffect(() => {
    async function fetchTeam() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('startup_id', startupId);

      setTeam(data || []);
    }

    fetchTeam();
  }, [startupId]);

  return { team };
}