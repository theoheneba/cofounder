/*
  # Add Profile Fields and Connections

  1. New Fields
    - Add fields for work history, education, skills
    - Add fields for startup details and pitch deck
    - Add fields for location and preferences
  
  2. New Tables
    - Create connections table for managing user connections
    - Create connection_requests table for pending connections
  
  3. Security
    - Enable RLS on new tables
    - Add policies for viewing and managing connections
*/

-- Add new fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS work_history jsonb[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS education jsonb[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS skills text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS startup_details jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pitch_deck_url text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferences jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_completed boolean DEFAULT false;

-- Create connections table
CREATE TABLE connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  connected_user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, connected_user_id)
);

-- Create connection requests table
CREATE TABLE connection_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users NOT NULL,
  receiver_id uuid REFERENCES auth.users NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(sender_id, receiver_id)
);

-- Enable RLS
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_requests ENABLE ROW LEVEL SECURITY;

-- Connections policies
CREATE POLICY "Users can view their own connections"
  ON connections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = connected_user_id);

CREATE POLICY "Users can manage their own connections"
  ON connections FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Connection requests policies
CREATE POLICY "Users can view their own requests"
  ON connection_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can create requests"
  ON connection_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update received requests"
  ON connection_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = receiver_id);

-- Create function to handle connection acceptance
CREATE OR REPLACE FUNCTION handle_connection_accept()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'accepted' AND OLD.status = 'pending' THEN
    -- Create bidirectional connection
    INSERT INTO connections (user_id, connected_user_id)
    VALUES 
      (NEW.sender_id, NEW.receiver_id),
      (NEW.receiver_id, NEW.sender_id)
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for connection acceptance
CREATE TRIGGER on_connection_accept
  AFTER UPDATE ON connection_requests
  FOR EACH ROW
  EXECUTE FUNCTION handle_connection_accept();