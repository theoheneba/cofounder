import React from 'react';
import { MessageSquare } from 'lucide-react';

export function MessageCenter() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>
      <div className="space-y-4">
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p>No new messages</p>
          <button className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
            Find Co-founders
          </button>
        </div>
      </div>
    </div>
  );
}