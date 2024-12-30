import React from 'react';
import { Send, Download } from 'lucide-react';
import type { ApplicationType } from '../../types';

interface EmptyApplicationsProps {
  type: ApplicationType;
}

export function EmptyApplications({ type }: EmptyApplicationsProps) {
  const config = {
    sent: {
      icon: Send,
      title: "You haven't submitted any applications yet",
      description: "Browse opportunities and start applying to find your perfect co-founder match",
      action: "Browse Opportunities",
    },
    received: {
      icon: Download,
      title: "No applications received yet",
      description: "Create a pitch to start receiving applications from potential co-founders",
      action: "Create Pitch",
    },
  };

  const { icon: Icon, title, description, action } = config[type];

  return (
    <div className="text-center py-12">
      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-indigo-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        {action}
      </button>
    </div>
  );
}