import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export interface DashboardStats {
  profileViews: number;
  connections: number;
  messages: number;
  matchScore: number;
  trends: {
    profileViews: string;
    connections: string;
    messages: string;
    matchScore: string;
  };
}

const DEFAULT_STATS: DashboardStats = {
  profileViews: 0,
  connections: 0,
  messages: 0,
  matchScore: 0,
  trends: {
    profileViews: '+0%',
    connections: '+0%',
    messages: '+0%',
    matchScore: '+0%'
  }
};

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    async function fetchStats() {
      try {
        const { data, error: fetchError } = await supabase
          .from('dashboard_stats')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          setStats({
            profileViews: data.profile_views,
            connections: data.connections,
            messages: data.messages,
            matchScore: data.match_score,
            trends: {
              profileViews: '+5%',
              connections: '+2%',
              messages: '+8%',
              matchScore: '+3%'
            }
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch stats'));
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [user]);

  return { stats, loading, error };
}