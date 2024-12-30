import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id,
            email,
            full_name,
            created_at,
            subscriptions (
              tier,
              status
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setUsers(data.map(profile => ({
          id: profile.id,
          email: profile.email,
          fullName: profile.full_name,
          createdAt: profile.created_at,
          subscriptionTier: profile.subscriptions?.[0]?.tier || 'free',
          subscriptionStatus: profile.subscriptions?.[0]?.status || 'expired',
          role: 'user'
        })));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch users'));
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}