import React, { useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import type { Startup } from '../../types';

interface StartupFormProps {
  onSubmit: (data: Partial<Startup>) => Promise<void>;
}

export function StartupForm({ onSubmit }: StartupFormProps) {
  const [loading, setLoading] = useState(false);
  const [pitchDeck, setPitchDeck] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data: Partial<Startup> = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        stage: formData.get('stage') as Startup['stage'],
        industry: (formData.get('industry') as string).split(','),
        teamSize: Number(formData.get('teamSize')),
        fundingStage: formData.get('fundingStage') as string,
      };
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting startup:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Startup Name</label>
        <input
          type="text"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Stage</label>
        <select
          name="stage"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="idea">Idea Stage</option>
          <option value="mvp">MVP</option>
          <option value="beta">Beta</option>
          <option value="launched">Launched</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Pitch Deck</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.ppt,.pptx"
                  onChange={(e) => setPitchDeck(e.target.files?.[0] || null)}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PDF or PPT up to 10MB</p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'Saving...' : 'Save Startup Details'}
      </button>
    </form>
  );
}