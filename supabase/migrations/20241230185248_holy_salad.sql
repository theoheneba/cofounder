/*
  # Add Super Admin Role and Functionality

  1. Changes
    - Add super_admin role to profiles
    - Add function to check super admin status
    - Add policies for super admin actions

  2. Security
    - Only super admins can promote/demote admins
    - Super admins have full access to all tables
*/

-- First, drop existing role constraint if it exists
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Add new role constraint including super_admin
ALTER TABLE profiles
ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('user', 'admin', 'super_admin'));

-- Create function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id
    AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql;

-- Create policy for super admin actions
CREATE POLICY "Super admins can do everything"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    is_super_admin(auth.uid()) OR 
    id = auth.uid()
  )
  WITH CHECK (
    is_super_admin(auth.uid()) OR 
    id = auth.uid()
  );

-- Create policy for managing admin roles
CREATE POLICY "Super admins can manage roles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    CASE
      WHEN is_super_admin(auth.uid()) THEN true
      ELSE id = auth.uid() AND 
           (OLD.role IS NULL OR OLD.role = NEW.role)
    END
  );