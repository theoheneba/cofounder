import React from 'react';
import { useUsers } from '../../hooks/useUsers';
import { UserListItem } from './UserListItem';
import { UserFilters } from './UserFilters';

export function UsersList() {
  const { users, loading, error } = useUsers();

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <UserFilters />
      <div className="mt-4 space-y-4">
        {users.map(user => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}