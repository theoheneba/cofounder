import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface StartupMetrics {
  activeStartups: number;
  averageTeamSize: number;
  growthRate: number;
  stageDistribution: Record<string, number>;
  industryDistribution: Record<string, number>;
}

export function useStartupMetrics() {
  const [metrics, setMetrics] = useState<StartupMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const { data: startups } = await supabase
          .from('startups')
          .select('*');

        if (startups) {
          const stages = startups.reduce((acc, startup) => {
            acc[startup.stage] = (acc[startup.stage] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

          const industries = startups.reduce((acc, startup) => {
            startup.industry.forEach(ind => {
              acc[ind] = (acc[ind] || 0) + 1;
            });
            return acc;
          }, {} as Record<string, number>);

          const total = startups.length;
          
          setMetrics({
            activeStartups: total,
            averageTeamSize: startups.reduce((acc, s) => acc + s.team_size, 0) / total,
            growthRate: 15, // This would need to be calculated based on historical data
            stageDistribution: Object.fromEntries(
              Object.entries(stages).map(([k, v]) => [k, (v / total) * 100])
            ),
            industryDistribution: Object.fromEntries(
              Object.entries(industries).map(([k, v]) => [k, (v / total) * 100])
            ),
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  return { metrics, loading };
}