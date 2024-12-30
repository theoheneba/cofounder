import React from 'react';
import { Building2, Users, Rocket, Calendar } from 'lucide-react';
import type { Startup } from '../../types';

interface StartupDetailsProps {
  startup: Startup;
}

export function StartupDetails({ startup }: StartupDetailsProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{startup.name}</h1>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <Building2 className="w-4 h-4" />
            <span>{startup.industry.join(', ')}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-sm mt-1">{startup.teamSize} Members</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Rocket className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm mt-1">{startup.stage}</p>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{startup.description}</p>

      {startup.pitchDeckUrl && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Pitch Deck</h3>
          <a
            href={startup.pitchDeckUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800"
          >
            View Pitch Deck
          </a>
        </div>
      )}

      <div className="flex items-center text-sm text-gray-500">
        <Calendar className="w-4 h-4 mr-1" />
        <span>Founded {new Date(startup.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}