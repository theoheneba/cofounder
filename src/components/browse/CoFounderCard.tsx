import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import { ConnectButton } from '../profile/ConnectButton';
import type { User } from '../../types';

interface CoFounderCardProps {
  founder: User;
  onChat: () => void;
}

export function CoFounderCard({ founder, onChat }: CoFounderCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={founder.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${founder.fullName}`}
          alt={founder.fullName}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <Link to={`/profile/${founder.id}`} className="hover:text-indigo-600">
            <h3 className="text-xl font-semibold">{founder.fullName}</h3>
          </Link>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Briefcase className="w-4 h-4" />
            <span>{founder.role || 'Co-Founder'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{founder.location || 'Remote'}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Looking for:</h4>
        <div className="flex flex-wrap gap-2">
          {founder.lookingFor?.map((role) => (
            <span key={role} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {founder.skills?.slice(0, 3).map((skill) => (
            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <ConnectButton userId={founder.id} />
        <button
          onClick={onChat}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          Chat
        </button>
      </div>
    </div>
  );
}