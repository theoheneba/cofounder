import React from 'react';
import { Send, Download } from 'lucide-react';
import type { ApplicationType } from '../../types';

interface ApplicationTabsProps {
  activeTab: ApplicationType;
  onTabChange: (tab: ApplicationType) => void;
}

export function ApplicationTabs({ activeTab, onTabChange }: ApplicationTabsProps) {
  const tabs = [
    {
      id: 'sent',
      label: 'Applications Sent',
      icon: Send,
      count: 0,
    },
    {
      id: 'received',
      label: 'Applications Received',
      icon: Download,
      count: 0,
    },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as ApplicationType)}
            className={`
              flex items-center py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <tab.icon className="w-5 h-5 mr-2" />
            {tab.label} ({tab.count})
          </button>
        ))}
      </nav>
    </div>
  );
}