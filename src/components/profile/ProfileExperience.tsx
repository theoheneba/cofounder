import React from 'react';
import { Building2, Calendar } from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface ProfileExperienceProps {
  experience?: Experience[];
}

export function ProfileExperience({ experience = [] }: ProfileExperienceProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Professional Experience</h2>
      
      {experience.length > 0 ? (
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">{exp.role}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Building2 className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p>No experience added yet</p>
          <button className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
            Add Experience
          </button>
        </div>
      )}
    </div>
  );
}