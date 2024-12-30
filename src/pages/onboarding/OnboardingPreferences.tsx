import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PreferencesForm } from '../../components/onboarding/PreferencesForm';
import { useOnboarding } from '../../hooks/useOnboarding';

export function OnboardingPreferences() {
  const navigate = useNavigate();
  const { updateProgress } = useOnboarding();

  const handleComplete = async () => {
    await updateProgress('preferences_completed');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Set your preferences</h1>
          <p className="text-gray-600">
            Help us match you with the right co-founders
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <PreferencesForm onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
}