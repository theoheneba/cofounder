/*
  # Add verified badge to profiles

  1. Changes
    - Add is_verified column to profiles table
    - Add verification date tracking
*/

-- Add verified status to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS verified_at timestamptz;

-- Create function to update verified_at timestamp
CREATE OR REPLACE FUNCTION update_verified_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_verified = true AND OLD.is_verified = false THEN
    NEW.verified_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for verified_at
CREATE TRIGGER set_verified_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_verified_at();

-- Add policy for verified status
CREATE POLICY "Only admins can verify users"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );