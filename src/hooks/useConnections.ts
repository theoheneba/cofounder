import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export function useConnections() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    async function fetchConnections() {
      try {
        // Fetch connections
        const { data: connectionsData, error: connectionsError } = await supabase
          .from('connections')
          .select(`
            connected_user_id,
            connected_user:profiles!connected_user_id(*)
          `)
          .eq('user_id', user.id);

        if (connectionsError) throw connectionsError;
        setConnections(connectionsData || []);

        // Fetch pending requests
        const { data: requestsData, error: requestsError } = await supabase
          .from('connection_requests')
          .select(`
            *,
            sender:profiles!sender_id(*),
            receiver:profiles!receiver_id(*)
          `)
          .eq('receiver_id', user.id)
          .eq('status', 'pending');

        if (requestsError) throw requestsError;
        setPendingRequests(requestsData || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch connections'));
      } finally {
        setLoading(false);
      }
    }

    fetchConnections();
  }, [user]);

  const sendConnectionRequest = async (receiverId: string) => {
    try {
      const { error } = await supabase
        .from('connection_requests')
        .insert([{ sender_id: user?.id, receiver_id: receiverId }]);

      if (error) throw error;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to send connection request');
    }
  };

  const respondToRequest = async (requestId: string, status: 'accepted' | 'declined') => {
    try {
      const { error } = await supabase
        .from('connection_requests')
        .update({ status })
        .eq('id', requestId)
        .eq('receiver_id', user?.id);

      if (error) throw error;
      
      // Update local state
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to respond to request');
    }
  };

  return {
    connections,
    pendingRequests,
    loading,
    error,
    sendConnectionRequest,
    respondToRequest,
  };
}