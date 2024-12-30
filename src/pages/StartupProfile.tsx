import React from 'react';
import { useParams } from 'react-router-dom';
import { StartupDetails } from '../components/startup/StartupDetails';
import { StartupRoadmap } from '../components/startup/StartupRoadmap';
import { StartupChangelog } from '../components/startup/StartupChangelog';
import { StartupTeam } from '../components/startup/StartupTeam';
import { useStartup } from '../hooks/useStartup';

export function StartupProfile() {
  const { id } = useParams();
  const { startup, loading, error } = useStartup(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading startup</div>;
  if (!startup) return <div>Startup not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <StartupDetails startup={startup} />
          <StartupRoadmap startupId={startup.id} />
          <StartupChangelog startupId={startup.id} />
        </div>
        <div>
          <StartupTeam startupId={startup.id} />
        </div>
      </div>
    </div>
  );
}