/*
  # Fix Dashboard Stats Cleanup

  1. Changes
    - Clean up duplicate rows
    - Update initialization function
    - Handle existing trigger
*/

-- First, clean up any duplicate rows while keeping the most recent
WITH duplicates AS (
  SELECT DISTINCT ON (user_id) id, user_id
  FROM dashboard_stats
  ORDER BY user_id, updated_at DESC
)
DELETE FROM dashboard_stats
WHERE id NOT IN (SELECT id FROM duplicates);

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS initialize_dashboard_stats();

-- Create initialization function with conflict handling
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
  ) ON CONFLICT (user_id) DO UPDATE SET
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create new trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_dashboard_stats();