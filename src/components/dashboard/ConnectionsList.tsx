import React from 'react';
import { Users } from 'lucide-react';

export function ConnectionsList() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Connections</h2>
      <div className="text-center py-8 text-gray-500">
        <Users className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p>No connections yet</p>
        <button className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
          Browse Co-founders
        </button>
      </div>
    </div>
  );
}