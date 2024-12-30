import React from 'react';
import { Target } from 'lucide-react';
import type { Application, ApplicationType } from '../../types';
import { EmptyApplications } from './EmptyApplications';

interface ApplicationListProps {
  applications: Application[];
  type: ApplicationType;
}

export function ApplicationList({ applications, type }: ApplicationListProps) {
  if (applications.length === 0) {
    return <EmptyApplications type={type} />;
  }

  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm divide-y">
      {applications.map((application) => (
        <div key={application.id} className="p-6 hover:bg-gray-50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{application.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  application.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : application.status === 'accepted'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {application.status}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{application.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  View Details
                </button>
                {type === 'received' && (
                  <>
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      Accept
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      Decline
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}