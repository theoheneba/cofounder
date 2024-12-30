-- Allow new users to be created with default role
ALTER TABLE profiles
ALTER COLUMN role SET DEFAULT 'user';

-- Ensure RLS doesn't block initial user creation
CREATE POLICY "Allow public profile creation"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create super admin if doesn't exist
INSERT INTO profiles (id, email, full_name, role)
SELECT 
  auth.uid(),
  'superadmin@cofounderhub.com',
  'Super Admin',
  'super_admin'
FROM auth.users
WHERE email = 'superadmin@cofounderhub.com'
ON CONFLICT (id) DO UPDATE
SET role = 'super_admin';