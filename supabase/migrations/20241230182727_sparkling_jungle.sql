/*
  # Fix Dashboard Stats Duplicates

  1. Changes
    - Remove duplicate dashboard stats entries
    - Add unique constraint safely
*/

-- First, keep only the most recently updated row for each user_id
WITH duplicates AS (
  SELECT DISTINCT ON (user_id) id
  FROM dashboard_stats
  ORDER BY user_id, updated_at DESC
)
DELETE FROM dashboard_stats
WHERE id NOT IN (SELECT id FROM duplicates);

-- Now add the unique constraint
ALTER TABLE dashboard_stats
ADD CONSTRAINT dashboard_stats_user_id_key UNIQUE (user_id);

-- Recreate the trigger with conflict handling
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