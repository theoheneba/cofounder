import React from 'react';
import { useForm } from 'react-hook-form';
import { useStartup } from '../../hooks/useStartup';
import { useOnboarding } from '../../hooks/useOnboarding';

interface StartupFormProps {
  onComplete: () => void;
}

interface StartupFormData {
  name: string;
  description: string;
  stage: 'idea' | 'mvp' | 'beta' | 'launched';
  industry: string;
}

export function StartupForm({ onComplete }: StartupFormProps) {
  const { register, handleSubmit } = useForm<StartupFormData>();
  const { createStartup, loading } = useStartup();
  const { updateProgress } = useOnboarding();

  const onSubmit = async (data: StartupFormData) => {
    try {
      await createStartup({
        ...data,
        industry: data.industry.split(',').map(i => i.trim()),
      });
      await updateProgress('startupCompleted');
      onComplete();
    } catch (error) {
      console.error('Failed to create startup:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Startup Name</label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: true })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Stage</label>
        <select
          {...register('stage', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="idea">Idea Stage</option>
          <option value="mvp">MVP</option>
          <option value="beta">Beta</option>
          <option value="launched">Launched</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Industry</label>
        <input
          type="text"
          {...register('industry', { required: true })}
          placeholder="e.g., SaaS, Fintech, E-commerce (comma separated)"
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