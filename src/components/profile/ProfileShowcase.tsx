import React from 'react';
import { Briefcase } from 'lucide-react';

export function ProfileShowcase() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Showcase</h2>
      <div className="text-center py-8 text-gray-500">
        <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p>No items in showcase yet</p>
        <button className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
          Add Project
        </button>
      </div>
    </div>
  );
}