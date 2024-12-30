import React from 'react';
import { useForm } from 'react-hook-form';
import { useProfile } from '../../hooks/useProfile';

interface PreferencesFormData {
  workingStyle: string;
  location: string;
  remote: string;
  availability: string;
  lookingFor: string[];
}

export function PreferencesForm() {
  const { register, handleSubmit } = useForm<PreferencesFormData>();
  const { updateProfile, loading } = useProfile();

  const onSubmit = async (data: PreferencesFormData) => {
    try {
      await updateProfile({ preferences: data });
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Working Style</label>
        <select
          {...register('workingStyle')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="collaborative">Collaborative</option>
          <option value="independent">Independent</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location Preference</label>
        <select
          {...register('location')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="local">Local Only</option>
          <option value="remote">Remote Only</option>
          <option value="hybrid">Hybrid</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Remote Work Preference</label>
        <select
          {...register('remote')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="yes">Yes, I prefer remote work</option>
          <option value="no">No, I prefer in-person</option>
          <option value="hybrid">I prefer a hybrid approach</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Availability</label>
        <select
          {...register('availability')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="weekends">Weekends Only</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Looking For</label>
        <input
          type="text"
          {...register('lookingFor')}
          placeholder="e.g., Technical Co-Founder, Marketing Expert (comma separated)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'Saving...' : 'Save Preferences'}
      </button>
    </form>
  );
}