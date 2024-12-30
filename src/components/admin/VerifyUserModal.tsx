import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface VerifyUserModalProps {
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  onVerify: () => Promise<void>;
  onClose: () => void;
}

export function VerifyUserModal({ user, onVerify, onClose }: VerifyUserModalProps) {
  const [loading, setLoading] = React.useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      await onVerify();
      onClose();
    } catch (error) {
      console.error('Error verifying user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Verify Co-Founder</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to verify {user.fullName}? This will add a verified badge to their profile.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{user.fullName}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              'Verifying...'
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Verify User
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}