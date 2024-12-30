import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileForm } from '../../components/onboarding/ProfileForm';
import { useOnboarding } from '../../hooks/useOnboarding';

export function OnboardingProfile() {
  const navigate = useNavigate();
  const { updateProgress } = useOnboarding();

  const handleComplete = async () => {
    await updateProgress('profile_completed');
    navigate('/onboarding/startup');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Tell us about yourself</h1>
          <p className="text-gray-600">
            Help others understand your background and expertise
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <ProfileForm onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
}