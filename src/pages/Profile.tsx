import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { ProfileSection } from '@/components/profile/profile-section';
import { ShowcaseSection } from '@/components/profile/sections/showcase-section';
import { VerificationSection } from '@/components/profile/sections/verification-section';
import { PitchDeckSection } from '@/components/profile/sections/pitch-deck-section';
import { ExperienceSection } from '@/components/profile/sections/experience-section';
import { SkillsSection } from '@/components/profile/sections/skills-section';
import { PreferencesSection } from '@/components/profile/sections/preferences-section';
import { AvailabilitySection } from '@/components/profile/sections/availability-section';
import * as profileApi from '@/lib/api/profiles';
import * as showcaseApi from '@/lib/api/showcase';
import * as verificationApi from '@/lib/api/verification';
import * as pitchDeckApi from '@/lib/api/pitch-decks';

export function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [showcase, setShowcase] = useState([]);
  const [pitchDecks, setPitchDecks] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState({
    identity_verified: false,
    professional_verified: false,
    education_verified: false
  });

  const loadProfileData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Ensure profile exists
      const profileData = await profileApi.ensureProfileExists(user.id);
      
      // Load other data in parallel
      const [showcaseItems, pitchDeckItems, verificationData] = await Promise.all([
        showcaseApi.getShowcaseItems(user.id),
        pitchDeckApi.getPitchDecks(user.id),
        verificationApi.getVerificationStatus()
      ]);

      setProfile(profileData);
      setShowcase(showcaseItems);
      setPitchDecks(pitchDeckItems);
      setVerificationStatus(verificationData);
    } catch (err) {
      console.error('Failed to load profile data:', err);
      setError('Failed to load profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-red-50 p-4 text-center text-red-800">
          <p>{error}</p>
          <button
            onClick={loadProfileData}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <ProfileSection
            isOwnProfile={true}
            profile={{
              name: profile.full_name || 'Complete Your Profile',
              initials: (profile.full_name || 'U').charAt(0).toUpperCase(),
              followers: 0,
              following: 0
            }}
            onProfileUpdated={loadProfileData}
          />
          
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <ShowcaseSection
                items={showcase}
                isOwnProfile={true}
                onItemAdded={() => {
                  showcaseApi.getShowcaseItems(user!.id).then(setShowcase);
                }}
              />
              <VerificationSection
                status={verificationStatus}
                isOwnProfile={true}
              />
              <PitchDeckSection
                pitchDecks={pitchDecks}
                isOwnProfile={true}
                onPitchDeckAdded={() => {
                  pitchDeckApi.getPitchDecks(user!.id).then(setPitchDecks);
                }}
              />
            </div>
            
            <div className="space-y-6">
              <ExperienceSection
                industry={profile.industry}
                experience={profile.experience_level}
              />
              <SkillsSection
                primarySkills={profile.primary_skills || []}
                skillsSeeking={profile.skills_seeking || []}
              />
              <PreferencesSection
                workingStyle={profile.working_style}
                location={profile.location}
                remotePreference={profile.remote_preference}
              />
              <AvailabilitySection
                currentStatus={profile.current_status || 'Not available'}
                lastActive={profile.last_active || 'Never'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}