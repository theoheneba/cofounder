/*
  # Fix profiles and startups relationship

  1. Changes
    - Add startup_id to profiles table
    - Add foreign key constraint
    - Update profiles query
*/

-- Add startup_id to profiles if it doesn't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS startup_id uuid REFERENCES startups(id);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_startup_id 
ON profiles(startup_id);

-- Enable RLS for the new column
CREATE POLICY "Users can view startup relationships"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);