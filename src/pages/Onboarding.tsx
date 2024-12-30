import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Users, Target } from 'lucide-react';
import { ProfileForm } from '../components/onboarding/ProfileForm';
import { StartupForm } from '../components/onboarding/StartupForm';
import { PreferencesForm } from '../components/onboarding/PreferencesForm';

const steps = [
  {
    id: 'profile',
    title: 'Complete Your Profile',
    description: 'Tell us about your skills and experience',
    icon: Users,
    component: ProfileForm,
  },
  {
    id: 'startup',
    title: 'Add Your Startup',
    description: 'Share details about your startup or idea',
    icon: Rocket,
    component: StartupForm,
  },
  {
    id: 'preferences',
    title: 'Set Your Preferences',
    description: 'What are you looking for in a co-founder?',
    icon: Target,
    component: PreferencesForm,
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleComplete = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to CoFounderHub!</h1>
          <p className="text-gray-600">Let's get your profile set up</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index <= currentStep ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                <step.icon className="w-5 h-5" />
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-indigo-600 rounded-full transition-all"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>

          <CurrentStepComponent onComplete={handleComplete} />

          <div className="flex justify-end space-x-4 mt-6">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}