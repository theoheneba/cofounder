import React from 'react';
import { Filter } from 'lucide-react';

const SKILLS = ['Programming', 'Design', 'Marketing', 'Sales'];

export function Filters() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Filter className="w-5 h-5 mr-2" />
        Filters
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Looking for
          </label>
          <select className="w-full border-gray-300 rounded-md shadow-sm">
            <option>Technical Co-Founder</option>
            <option>Business Co-Founder</option>
            <option>Marketing Co-Founder</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select className="w-full border-gray-300 rounded-md shadow-sm">
            <option>Anywhere</option>
            <option>United States</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          <div className="space-y-2">
            {SKILLS.map((skill) => (
              <label key={skill} className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                <span className="ml-2 text-sm text-gray-600">{skill}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}