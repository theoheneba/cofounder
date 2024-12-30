/*
  # Create Dashboard Stats Table

  1. New Tables
    - `dashboard_stats`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `profile_views` (integer)
      - `connections` (integer) 
      - `messages` (integer)
      - `match_score` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to view and manage their own stats
*/

-- Create dashboard_stats table
CREATE TABLE dashboard_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
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
  ON dashboard_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own dashboard stats"
  ON dashboard_stats
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER set_dashboard_stats_updated_at
  BEFORE UPDATE ON dashboard_stats
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create function to initialize dashboard stats on user creation
CREATE OR REPLACE FUNCTION initialize_dashboard_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO dashboard_stats (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to initialize stats when user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_dashboard_stats();