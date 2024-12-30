import { useState } from 'react';
import type { Application, ApplicationType } from '../types';

export function useApplications() {
  const [activeTab, setActiveTab] = useState<ApplicationType>('sent');
  const [applications] = useState<Application[]>([]);

  return {
    applications,
    activeTab,
    setActiveTab,
  };
}