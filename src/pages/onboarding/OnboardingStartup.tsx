import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StartupForm } from '../../components/onboarding/StartupForm';
import { useOnboarding } from '../../hooks/useOnboarding';

export function OnboardingStartup() {
  const navigate = useNavigate();
  const { updateProgress } = useOnboarding();

  const handleComplete = async () => {
    await updateProgress('startup_completed');
    navigate('/onboarding/preferences');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Tell us about your startup</h1>
          <p className="text-gray-600">
            Share details about your startup or business idea
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <StartupForm onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
}