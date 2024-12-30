/*
  # Add startup and subscription features

  1. New Tables
    - `startups`
      - Core startup information
      - Pitch deck storage
      - Team and funding details
    - `roadmaps`
      - Milestone tracking
      - Progress indicators
    - `changelogs`
      - Update history
      - Feature tracking
    - `subscriptions`
      - Payment tiers
      - Subscription status

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Startups table
CREATE TABLE startups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  description text,
  stage text NOT NULL CHECK (stage IN ('idea', 'mvp', 'beta', 'launched')),
  industry text[] NOT NULL DEFAULT '{}',
  pitch_deck_url text,
  funding_stage text,
  team_size integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE startups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all startups"
  ON startups FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own startups"
  ON startups FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Roadmaps table
CREATE TABLE roadmaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id uuid REFERENCES startups ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date timestamptz,
  status text NOT NULL DEFAULT 'planned'
    CHECK (status IN ('planned', 'in-progress', 'completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view startup roadmaps"
  ON roadmaps FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM startups s
    WHERE s.id = startup_id AND s.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage startup roadmaps"
  ON roadmaps FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM startups s
    WHERE s.id = startup_id AND s.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM startups s
    WHERE s.id = startup_id AND s.user_id = auth.uid()
  ));

-- Changelogs table
CREATE TABLE changelogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id uuid REFERENCES startups ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('feature', 'improvement', 'bugfix')),
  date timestamptz DEFAULT now()
);

ALTER TABLE changelogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view startup changelogs"
  ON changelogs FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM startups s
    WHERE s.id = startup_id AND s.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage startup changelogs"
  ON changelogs FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM startups s
    WHERE s.id = startup_id AND s.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM startups s
    WHERE s.id = startup_id AND s.user_id = auth.uid()
  ));

-- Subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  tier text NOT NULL CHECK (tier IN ('free', 'pro', 'enterprise')),
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'cancelled', 'expired')),
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz,
  price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own subscription"
  ON subscriptions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);