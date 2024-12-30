import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { useConnections } from '../../hooks/useConnections';

interface ConnectButtonProps {
  userId: string;
  onSuccess?: () => void;
}

export function ConnectButton({ userId, onSuccess }: ConnectButtonProps) {
  const [loading, setLoading] = useState(false);
  const { sendConnectionRequest } = useConnections();

  const handleConnect = async () => {
    setLoading(true);
    try {
      await sendConnectionRequest(userId);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to send connection request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <UserPlus className="w-4 h-4" />
      )}
      {loading ? 'Sending Request...' : 'Connect'}
    </button>
  );
}