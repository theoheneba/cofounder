import React from 'react';
import { MessageSquare, UserPlus } from 'lucide-react';

const matches = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Technical Co-Founder',
    matchScore: 95,
    skills: ['React', 'Node.js', 'AWS'],
    location: 'San Francisco, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Co-Founder',
    matchScore: 88,
    skills: ['Marketing', 'Sales', 'Strategy'],
    location: 'New York, NY',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  },
];

export function MatchList() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Top Matches</h2>
      </div>
      <div className="divide-y">
        {matches.map((match) => (
          <div key={match.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start gap-4">
              <img
                src={match.avatarUrl}
                alt={match.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{match.name}</h3>
                  <span className="text-sm font-medium text-indigo-600">
                    {match.matchScore}% Match
                  </span>
                </div>
                <p className="text-sm text-gray-600">{match.role}</p>
                <p className="text-sm text-gray-500">{match.location}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {match.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                <UserPlus className="w-4 h-4" />
                Connect
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border rounded-lg hover:bg-gray-50">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}