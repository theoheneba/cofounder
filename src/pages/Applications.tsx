import React from 'react';
import { ApplicationTabs } from '../components/applications/ApplicationTabs';
import { ApplicationList } from '../components/applications/ApplicationList';
import { useApplications } from '../hooks/useApplications';

export function Applications() {
  const { applications, activeTab, setActiveTab } = useApplications();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600">Manage your pitch applications</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Browse Opportunities
          </button>
        </div>

        <ApplicationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <ApplicationList applications={applications} type={activeTab} />
      </div>
    </div>
  );
}