import React from 'react';
import { useForm } from 'react-hook-form';
import { useProfile } from '../../hooks/useProfile';
import { useOnboarding } from '../../hooks/useOnboarding';

interface ProfileFormProps {
  onComplete: () => void;
}

interface ProfileFormData {
  fullName: string;
  bio: string;
  skills: string;
  location: string;
}

export function ProfileForm({ onComplete }: ProfileFormProps) {
  const { register, handleSubmit } = useForm<ProfileFormData>();
  const { updateProfile, loading } = useProfile();
  const { updateProgress } = useOnboarding();

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        ...data,
        skills: data.skills.split(',').map(s => s.trim()),
      });
      await updateProgress('profileCompleted');
      onComplete();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          {...register('fullName', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          {...register('bio', { required: true })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <input
          type="text"
          {...register('skills', { required: true })}
          placeholder="e.g., React, Marketing, Sales (comma separated)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          {...register('location', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'Saving...' : 'Continue'}
      </button>
    </form>
  );
}