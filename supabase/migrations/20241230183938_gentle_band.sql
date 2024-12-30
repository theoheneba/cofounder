/*
  # Fix onboarding progress policies

  1. Changes
    - Add missing INSERT policy
    - Grant necessary permissions
    - Skip duplicate policies that already exist
*/

-- Add missing INSERT policy for onboarding_progress
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'onboarding_progress' 
    AND policyname = 'Users can insert own onboarding progress'
  ) THEN
    CREATE POLICY "Users can insert own onboarding progress"
      ON onboarding_progress
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Grant necessary permissions if not already granted
GRANT ALL ON onboarding_progress TO authenticated;