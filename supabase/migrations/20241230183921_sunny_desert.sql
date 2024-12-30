-- Add missing INSERT policy for onboarding_progress
CREATE POLICY "Users can insert own onboarding progress"
  ON onboarding_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Add missing SELECT policy for onboarding_progress
CREATE POLICY "Users can view own onboarding progress"
  ON onboarding_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Add missing UPDATE policy for onboarding_progress
CREATE POLICY "Users can update own onboarding progress"
  ON onboarding_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON onboarding_progress TO authenticated;