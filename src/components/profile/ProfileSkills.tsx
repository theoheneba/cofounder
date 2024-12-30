import React from 'react';
import { Wrench } from 'lucide-react';

interface ProfileSkillsProps {
  skills?: string[];
}

export function ProfileSkills({ skills = [] }: ProfileSkillsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Skills & Expertise</h2>
      
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Wrench className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p>No skills added yet</p>
          <button className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
            Add Skills
          </button>
        </div>
      )}
    </div>
  );
}