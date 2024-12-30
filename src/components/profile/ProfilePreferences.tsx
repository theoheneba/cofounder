import React from 'react';
import { Users, MapPin, Clock } from 'lucide-react';

interface Preferences {
  workingStyle?: string;
  location?: string;
  remote?: string;
  availability?: string;
}

interface ProfilePreferencesProps {
  preferences?: Preferences;
}

export function ProfilePreferences({ preferences }: ProfilePreferencesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Working Preferences</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Working Style</h3>
          {preferences?.workingStyle ? (
            <p>{preferences.workingStyle}</p>
          ) : (
            <p className="text-gray-500">Not specified</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Location</h3>
          {preferences?.location ? (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{preferences.location}</span>
            </div>
          ) : (
            <p className="text-gray-500">Not specified</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Remote Preference</h3>
          {preferences?.remote ? (
            <p>{preferences.remote}</p>
          ) : (
            <p className="text-gray-500">Not specified</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Availability</h3>
          {preferences?.availability ? (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{preferences.availability}</span>
            </div>
          ) : (
            <p className="text-gray-500">Not specified</p>
          )}
        </div>
      </div>
    </div>
  );
}