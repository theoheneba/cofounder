/*
  # Fix Dashboard Stats Table

  1. Changes
    - Drop and recreate dashboard_stats table with proper constraints
    - Add proper RLS policies
    - Add initialization trigger
*/

-- Drop existing table and recreate
DROP TABLE IF EXISTS dashboard_stats;

CREATE TABLE dashboard_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  profile_views integer DEFAULT 0,
  connections integer DEFAULT 0,
  messages integer DEFAULT 0,
  match_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE dashboard_stats ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own dashboard stats"
  ON dashboard_stats FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own dashboard stats"
  ON dashboard_stats FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create initialization trigger
CREATE OR REPLACE FUNCTION initialize_dashboard_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO dashboard_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_dashboard_stats();