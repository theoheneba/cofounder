import React from 'react';
import { useForm } from 'react-hook-form';
import { useProfile } from '../../../hooks/useProfile';
import { Building2, Globe, Linkedin, Twitter } from 'lucide-react';

interface ProfileFormData {
  fullName: string;
  professionalTitle: string;
  bio: string;
  location: string;
  industry: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  skills: string;
  experience: string;
}

export function ProfileForm() {
  const { register, handleSubmit } = useForm<ProfileFormData>();
  const { updateProfile, loading } = useProfile();

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        ...data,
        skills: data.skills.split(',').map(s => s.trim()),
        socialLinks: {
          website: data.website,
          linkedin: data.linkedin,
          twitter: data.twitter
        }
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            {...register('fullName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Professional Title</label>
          <input
            type="text"
            {...register('professionalTitle')}
            placeholder="e.g. Full Stack Developer"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          {...register('bio')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            {...register('location')}
            placeholder="City, Country"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <input
            type="text"
            {...register('industry')}
            placeholder="e.g. Technology, Healthcare"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Social Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              {...register('website')}
              placeholder="Website URL"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              {...register('linkedin')}
              placeholder="LinkedIn URL"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              {...register('twitter')}
              placeholder="Twitter URL"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <input
          type="text"
          {...register('skills')}
          placeholder="e.g. React, Node.js, Product Management (comma separated)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Professional Experience</label>
        <textarea
          {...register('experience')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Describe your relevant work experience..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}