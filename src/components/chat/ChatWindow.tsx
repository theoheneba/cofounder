import React, { useState } from 'react';
import { Send, Paperclip, Video } from 'lucide-react';
import type { User } from '../../types';

interface ChatWindowProps {
  recipient: User;
  onClose: () => void;
}

export function ChatWindow({ recipient, onClose }: ChatWindowProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Implement message sending
    setMessage('');
  };

  return (
    <div className="fixed bottom-0 right-4 w-80 bg-white rounded-t-xl shadow-xl border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-indigo-600 text-white rounded-t-xl">
        <div className="flex items-center gap-2">
          <img
            src={recipient.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${recipient.fullName}`}
            alt={recipient.fullName}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{recipient.fullName}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-indigo-700 rounded">
            <Video className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-indigo-700 rounded">
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4">
        {/* Sample messages */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <img
              src={recipient.avatarUrl}
              alt={recipient.fullName}
              className="w-8 h-8 rounded-full"
            />
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">Hi! I saw your profile and I'm interested in connecting.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}