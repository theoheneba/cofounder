import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SubscriptionStats {
  activeSubscriptions: number;
  monthlyRevenue: number;
  conversionRate: number;
  freePlanPercentage: number;
  proPlanPercentage: number;
  enterprisePlanPercentage: number;
}

export function useSubscriptionStats() {
  const [stats, setStats] = useState<SubscriptionStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: subscriptions } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('status', 'active');

        if (subscriptions) {
          const total = subscriptions.length;
          const free = subscriptions.filter(s => s.tier === 'free').length;
          const pro = subscriptions.filter(s => s.tier === 'pro').length;
          const enterprise = subscriptions.filter(s => s.tier === 'enterprise').length;

          setStats({
            activeSubscriptions: total,
            monthlyRevenue: pro * 29 + enterprise * 99,
            conversionRate: ((pro + enterprise) / total) * 100,
            freePlanPercentage: (free / total) * 100,
            proPlanPercentage: (pro / total) * 100,
            enterprisePlanPercentage: (enterprise / total) * 100,
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}