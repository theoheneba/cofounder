import React from 'react';
import { User } from '../../types';
import { Briefcase, MapPin, Users } from 'lucide-react';

interface ProfileCardProps {
  profile: User;
  onConnect?: () => void;
}

export function ProfileCard({ profile, onConnect }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start gap-4">
        <img
          src={profile.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.fullName}`}
          alt={profile.fullName}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{profile.fullName}</h3>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Briefcase className="w-4 h-4" />
            <span>Tech Founder</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium mb-2">Looking for:</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Technical Co-Founder
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Full-Stack Developer
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Skills:</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Product Management
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Business Development
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Marketing
          </span>
        </div>
      </div>

      {onConnect && (
        <button
          onClick={onConnect}
          className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Users className="w-4 h-4 inline-block mr-2" />
          Connect
        </button>
      )}
    </div>
  );
}