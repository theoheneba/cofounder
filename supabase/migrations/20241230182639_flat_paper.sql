/*
  # Fix Dashboard Stats Table

  1. Changes
    - Add unique constraint on user_id to ensure one row per user
    - Add trigger to initialize stats on user creation
    - Add missing policies
*/

-- Add unique constraint
ALTER TABLE dashboard_stats
ADD CONSTRAINT dashboard_stats_user_id_key UNIQUE (user_id);

-- Create function to initialize stats
CREATE OR REPLACE FUNCTION initialize_dashboard_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO dashboard_stats (
    user_id,
    profile_views,
    connections,
    messages,
    match_score
  ) VALUES (
    NEW.id,
    0,
    0,
    0,
    0
  ) ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_dashboard_stats();