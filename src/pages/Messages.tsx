import { useState, useEffect } from 'react';
import { ConversationList } from '@/components/messaging/conversation-list';
import { MessageThread } from '@/components/messaging/message-thread';
import { useAuth } from '@/contexts/auth-context';
import * as chatApi from '@/lib/api/chat';

export function MessagesPage() {
  const { user } = useAuth();
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadThreads = async () => {
      try {
        setLoading(true);
        const loadedThreads = await chatApi.getThreads(user.id);
        setThreads(loadedThreads);
        setError(null);
      } catch (err) {
        console.error('Failed to load threads:', err);
        setError('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    loadThreads();
  }, [user]);

  const handleStartChat = async (userId: string) => {
    if (!user) return;
    
    try {
      const thread = await chatApi.createThread([user.id, userId]);
      setSelectedThread(thread.id);
      setThreads(prev => [thread, ...prev]);
    } catch (err) {
      console.error('Failed to create thread:', err);
      setError('Failed to start conversation');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-white">
        <div className="text-gray-500">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      <div className="w-80 flex-shrink-0 border-r">
        <ConversationList
          conversations={threads}
          onSelect={setSelectedThread}
          selectedId={selectedThread}
        />
      </div>
      <div className="flex-1">
        {selectedThread ? (
          <MessageThread
            threadId={selectedThread}
            onStartVideoCall={() => {}}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
      
      {error && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}