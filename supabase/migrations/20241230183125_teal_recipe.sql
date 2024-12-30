/*
  # Fix Dashboard Stats Table

  1. Changes
    - Clean up duplicate rows
    - Add unique constraint safely
    - Update initialization trigger
*/

-- First, clean up any existing duplicate rows
WITH duplicates AS (
  SELECT DISTINCT ON (user_id) id, user_id
  FROM dashboard_stats
  ORDER BY user_id, updated_at DESC
)
DELETE FROM dashboard_stats
WHERE id NOT IN (SELECT id FROM duplicates);

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop existing function
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
  ) ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create new trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_dashboard_stats();

-- Add unique constraint after cleanup
ALTER TABLE dashboard_stats
ADD CONSTRAINT dashboard_stats_user_id_key UNIQUE (user_id);