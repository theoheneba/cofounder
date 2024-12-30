import React from 'react';
import { useParams } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { ProfileHeader } from '../components/profile/sections/ProfileHeader';
import { ProfileExperience } from '../components/profile/sections/ProfileExperience';
import { ProfileSkills } from '../components/profile/sections/ProfileSkills';
import { ProfilePreferences } from '../components/profile/sections/ProfilePreferences';

export function Profile() {
  const { id } = useParams();
  const { profile, isOwnProfile, loading } = useProfile(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileExperience
            experience={profile.experience}
            isEditable={isOwnProfile}
          />
          <ProfileSkills
            skills={profile.skills}
            isEditable={isOwnProfile}
          />
        </div>
        <div>
          <ProfilePreferences
            preferences={profile.preferences}
            isEditable={isOwnProfile}
          />
        </div>
      </div>
    </div>
  );
}