/*
  # Add onboarding and connections tables

  1. New Tables
    - `onboarding_progress`
      - Tracks user's onboarding completion status
      - Links to profile, startup, and preferences completion
    
  2. Changes
    - Add missing fields to profiles table
    - Add connection status tracking
    
  3. Security
    - Enable RLS on new tables
    - Add policies for user access
*/

-- Add onboarding progress tracking
CREATE TABLE onboarding_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  profile_completed boolean DEFAULT false,
  startup_completed boolean DEFAULT false,
  preferences_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own onboarding progress"
  ON onboarding_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding progress"
  ON onboarding_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to initialize onboarding progress
CREATE OR REPLACE FUNCTION initialize_onboarding_progress()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO onboarding_progress (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created_onboarding
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_onboarding_progress();

-- Add missing fields to profiles
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS looking_for text[],
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS connection_status jsonb DEFAULT '{}'::jsonb;