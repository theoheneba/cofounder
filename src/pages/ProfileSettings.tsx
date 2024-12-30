import React from 'react';
import { ProfileForm } from '../components/profile/sections/ProfileForm';

export function ProfileSettings() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-gray-600">Update your profile information and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <ProfileForm />
      </div>
    </div>
  );
}