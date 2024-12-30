-- Add INSERT policy for dashboard_stats
CREATE POLICY "Users can insert own dashboard stats"
  ON dashboard_stats
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Ensure the trigger function exists and has proper permissions
GRANT EXECUTE ON FUNCTION initialize_dashboard_stats() TO authenticated;

-- Grant necessary table permissions
GRANT ALL ON dashboard_stats TO authenticated;