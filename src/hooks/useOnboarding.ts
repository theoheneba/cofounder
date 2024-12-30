import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface OnboardingProgress {
  profile_completed: boolean;
  startup_completed: boolean;
  preferences_completed: boolean;
}

export function useOnboarding() {
  const [progress, setProgress] = useState<OnboardingProgress>({
    profile_completed: false,
    startup_completed: false,
    preferences_completed: false,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    async function fetchProgress() {
      try {
        const { data, error } = await supabase
          .from('onboarding_progress')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProgress({
            profile_completed: data.profile_completed,
            startup_completed: data.startup_completed,
            preferences_completed: data.preferences_completed,
          });
        }
      } catch (error) {
        console.error('Error fetching onboarding progress:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [user]);

  const updateProgress = async (step: keyof OnboardingProgress) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('onboarding_progress')
        .upsert({
          user_id: user.id,
          [step]: true,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setProgress(prev => ({ ...prev, [step]: true }));

      // Navigate to next step
      if (step === 'profile_completed') {
        navigate('/onboarding/startup');
      } else if (step === 'startup_completed') {
        navigate('/onboarding/preferences');
      } else if (step === 'preferences_completed') {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error updating onboarding progress:', error);
    }
  };

  return {
    progress,
    loading,
    updateProgress,
  };
}