import React from 'react';
import { Shield, Users } from 'lucide-react';
import { useSuperAdmin } from '../../hooks/useSuperAdmin';
import { useUsers } from '../../hooks/useUsers';

export function SuperAdminPanel() {
  const { users, loading: usersLoading } = useUsers();
  const { promoteToAdmin, demoteFromAdmin, loading: actionLoading } = useSuperAdmin();
  const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    if (actionLoading) return;
    
    try {
      if (newRole === 'admin') {
        await promoteToAdmin(userId);
      } else {
        await demoteFromAdmin(userId);
      }
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  if (usersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold">Super Admin Panel</h2>
      </div>

      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleRoleChange(
                        user.id,
                        user.role === 'admin' ? 'user' : 'admin'
                      )}
                      disabled={actionLoading && selectedUser === user.id}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}