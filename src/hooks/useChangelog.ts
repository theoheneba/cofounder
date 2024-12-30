import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Changelog } from '../types';

export function useChangelog(startupId: string) {
  const [changelog, setChangelog] = useState<Changelog[]>([]);

  useEffect(() => {
    async function fetchChangelog() {
      const { data } = await supabase
        .from('changelogs')
        .select('*')
        .eq('startup_id', startupId)
        .order('date', { ascending: false });

      setChangelog(data || []);
    }

    fetchChangelog();
  }, [startupId]);

  return { changelog };
}