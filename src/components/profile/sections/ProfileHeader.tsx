import React from 'react';
import { Mail, MapPin, Globe, Linkedin, Twitter, CheckCircle } from 'lucide-react';
import { ConnectButton } from '../ConnectButton';

interface ProfileHeaderProps {
  profile: {
    fullName: string;
    avatarUrl?: string;
    email: string;
    location?: string;
    role?: string;
    isVerified?: boolean;
    socialLinks?: {
      website?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  isOwnProfile: boolean;
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={profile.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.fullName}`}
              alt={profile.fullName}
              className="w-24 h-24 rounded-full"
            />
            {profile.isVerified && (
              <div className="absolute -right-1 -bottom-1 bg-white rounded-full p-1">
                <CheckCircle className="w-5 h-5 text-blue-500 fill-current" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{profile.fullName}</h1>
              {profile.role && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {profile.role}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <Mail className="w-4 h-4" />
              <span>{profile.email}</span>
            </div>
            {profile.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          {isOwnProfile ? (
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Edit Profile
            </button>
          ) : (
            <>
              <ConnectButton userId={profile.id} />
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Message
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-600">
        {profile.socialLinks?.website && (
          <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            <Globe className="w-5 h-5" />
          </a>
        )}
        {profile.socialLinks?.linkedin && (
          <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {profile.socialLinks?.twitter && (
          <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            <Twitter className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}