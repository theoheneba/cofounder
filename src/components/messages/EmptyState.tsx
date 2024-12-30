import React from 'react';
import { MessageSquare } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <MessageSquare className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        No Conversation Selected
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        Select a conversation from the list or connect with other founders to start messaging
      </p>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        Browse Co-Founders
      </button>
    </div>
  );
}