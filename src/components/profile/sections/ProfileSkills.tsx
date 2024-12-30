import React from 'react';
import { Wrench, Plus } from 'lucide-react';

interface ProfileSkillsProps {
  skills?: string[];
  isEditable?: boolean;
  onAdd?: () => void;
}

export function ProfileSkills({ skills = [], isEditable = false, onAdd }: ProfileSkillsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Skills & Expertise</h2>
        {isEditable && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Add Skills
          </button>
        )}
      </div>
      
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
          {isEditable && (
            <button
              onClick={onAdd}
              className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Add Skills
            </button>
          )}
        </div>
      )}
    </div>
  );
}