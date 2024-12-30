/*
  # Set up super admin account
  
  1. Changes
    - Updates the specified user to have super_admin role
    - Only runs if the user exists
*/

DO $$ 
BEGIN
  -- Check if the user exists and update their role
  IF EXISTS (
    SELECT 1 FROM profiles 
    WHERE email = 'superadmin@cofounderhub.com'
  ) THEN
    UPDATE profiles 
    SET role = 'super_admin' 
    WHERE email = 'superadmin@cofounderhub.com';
  END IF;
END $$;