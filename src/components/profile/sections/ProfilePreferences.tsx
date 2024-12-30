import React from 'react';
import { Users, MapPin, Clock, Globe } from 'lucide-react';

interface Preferences {
  workingStyle?: string;
  location?: string;
  remote?: string;
  availability?: string;
  lookingFor?: string[];
}

interface ProfilePreferencesProps {
  preferences?: Preferences;
  isEditable?: boolean;
  onEdit?: () => void;
}

export function ProfilePreferences({ preferences, isEditable = false, onEdit }: ProfilePreferencesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Working Preferences</h2>
        {isEditable && (
          <button
            onClick={onEdit}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Edit Preferences
          </button>
        )}
      </div>

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
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <span>{preferences.remote}</span>
            </div>
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

        {preferences?.lookingFor && preferences.lookingFor.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Looking For</h3>
            <div className="flex flex-wrap gap-2">
              {preferences.lookingFor.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}