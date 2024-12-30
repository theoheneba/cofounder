import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import type { Conversation } from '../../types';

interface ConversationViewProps {
  conversation: Conversation;
}

export function ConversationView({ conversation }: ConversationViewProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Implement message sending
    setMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center gap-3">
          <img
            src={conversation.participant.avatarUrl}
            alt={conversation.participant.fullName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-medium">{conversation.participant.fullName}</h2>
            <p className="text-sm text-gray-500">
              {conversation.participant.role}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {conversation.messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-4 ${
              msg.senderId === 'currentUser' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.senderId === 'currentUser'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs text-gray-400 mt-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}