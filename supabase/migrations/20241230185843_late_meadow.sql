/*
  # Make User Super Admin
  
  1. Changes
    - Updates the specified user's role to super_admin
  
  2. Security
    - Only affects the specific email address
    - Maintains existing RLS policies
*/

DO $$ 
BEGIN
  -- Update the specified user to super_admin
  UPDATE profiles 
  SET role = 'super_admin' 
  WHERE email = 'theohenebasa@gmail.com';
END $$;