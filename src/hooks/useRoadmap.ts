import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Roadmap } from '../types';

export function useRoadmap(startupId: string) {
  const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        const { data } = await supabase
          .from('roadmaps')
          .select('*')
          .eq('startup_id', startupId)
          .order('due_date', { ascending: true });

        setRoadmap(data || []);
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmap();
  }, [startupId]);

  return { roadmap, loading };
}