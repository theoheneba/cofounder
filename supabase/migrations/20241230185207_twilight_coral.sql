/*
  # Add Super Admin Role and Functionality

  1. Changes
    - Add super_admin role to profiles
    - Add policies for super admin actions
    - Add function to check super admin status

  2. Security
    - Only super admins can promote/demote admins
    - Super admins have full access to all tables
*/

-- Add super_admin role
ALTER TABLE profiles
DROP CONSTRAINT IF EXISTS profiles_role_check,
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
  USING (is_super_admin(auth.uid()))
  WITH CHECK (is_super_admin(auth.uid()));

-- Create policy for managing admin roles
CREATE POLICY "Super admins can manage admin roles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    is_super_admin(auth.uid()) 
    AND NEW.role IN ('user', 'admin')
  )
  WITH CHECK (
    is_super_admin(auth.uid())
    AND NEW.role IN ('user', 'admin')
  );