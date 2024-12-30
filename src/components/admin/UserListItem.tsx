import React from 'react';
import { User } from '../../types';
import { Mail, MapPin, Calendar } from 'lucide-react';

interface UserListItemProps {
  user: User;
}

export function UserListItem({ user }: UserListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`}
          alt={user.fullName}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-medium">{user.fullName}</h3>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {user.email}
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`px-3 py-1 rounded-full text-sm ${
          user.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
          user.subscriptionStatus === 'cancelled' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {user.subscriptionTier}
        </span>
      </div>
    </div>
  );
}