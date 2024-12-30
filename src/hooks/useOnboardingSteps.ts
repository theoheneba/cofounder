import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export function useOnboardingSteps() {
  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    async function fetchProgress() {
      try {
        // First try to get existing progress
        const { data: existingProgress } = await supabase
          .from('onboarding_progress')
          .select('*')
          .eq('user_id', user.id);

        let progress;

        // If no progress exists, create it
        if (!existingProgress?.length) {
          const { data: newProgress, error: insertError } = await supabase
            .from('onboarding_progress')
            .insert([{
              user_id: user.id,
              profile_completed: false,
              startup_completed: false,
              preferences_completed: false
            }])
            .select()
            .single();

          if (insertError) {
            console.error('Error creating onboarding progress:', insertError);
          } else {
            progress = newProgress;
          }
        } else {
          progress = existingProgress[0];
        }

        const { data: connections } = await supabase
          .from('connections')
          .select('*')
          .eq('user_id', user.id);

        setSteps([
          {
            id: 'profile',
            title: 'Complete your profile',
            description: 'Add your skills, experience, and preferences',
            completed: progress?.profile_completed || false
          },
          {
            id: 'startup',
            title: 'Add your startup details',
            description: 'Share information about your startup or idea',
            completed: progress?.startup_completed || false
          },
          {
            id: 'connect',
            title: 'Connect with 3 co-founders',
            description: 'Reach out to potential matches',
            completed: (connections?.length || 0) >= 3
          }
        ]);
      } catch (error) {
        console.error('Error fetching onboarding progress:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [user]);

  const markStepComplete = async (stepId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('onboarding_progress')
        .update({
          [`${stepId}_completed`]: true,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (!error) {
        setSteps(steps.map(step => 
          step.id === stepId ? { ...step, completed: true } : step
        ));
      }
    } catch (error) {
      console.error('Error updating onboarding progress:', error);
    }
  };

  return { steps, loading, markStepComplete };
}