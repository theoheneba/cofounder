import React from 'react';
import { MessageCircle } from 'lucide-react';
import type { Conversation } from '../../types';

interface MessageListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelect: (conversation: Conversation) => void;
}

export function MessageList({ conversations, activeConversation, onSelect }: MessageListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center p-4">
        <MessageCircle className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="font-medium text-gray-900 mb-1">No Messages Yet</h3>
        <p className="text-gray-500 text-sm mb-4">
          Connect with other founders to start messaging
        </p>
        <button className="text-indigo-600 hover:text-indigo-700 font-medium">
          Find Users
        </button>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelect(conversation)}
          className={`w-full p-4 text-left hover:bg-gray-50 ${
            activeConversation?.id === conversation.id ? 'bg-gray-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={conversation.participant.avatarUrl}
              alt={conversation.participant.fullName}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium truncate">
                  {conversation.participant.fullName}
                </h3>
                <span className="text-xs text-gray-500">
                  {conversation.lastMessage?.timestamp}
                </span>
              </div>
              {conversation.lastMessage && (
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage.content}
                </p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}