import React from 'react';
import { Search } from 'lucide-react';
import { MessageList } from '../components/messages/MessageList';
import { ConversationView } from '../components/messages/ConversationView';
import { EmptyState } from '../components/messages/EmptyState';
import { useMessages } from '../hooks/useMessages';

export function Messages() {
  const { conversations, activeConversation, setActiveConversation } = useMessages();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 min-h-[calc(100vh-4rem)]">
          {/* Messages List */}
          <div className="col-span-4 bg-white border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <MessageList
              conversations={conversations}
              activeConversation={activeConversation}
              onSelect={setActiveConversation}
            />
          </div>

          {/* Conversation View */}
          <div className="col-span-8 bg-gray-50">
            {activeConversation ? (
              <ConversationView conversation={activeConversation} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}