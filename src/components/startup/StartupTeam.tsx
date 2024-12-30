import React from 'react';
import { useTeam } from '../../hooks/useTeam';
import { Mail, Linkedin, Globe } from 'lucide-react';

interface StartupTeamProps {
  startupId: string;
}

export function StartupTeam({ startupId }: StartupTeamProps) {
  const { team } = useTeam(startupId);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Team</h2>
      
      {team?.length ? (
        <div className="space-y-6">
          {team.map((member) => (
            <div key={member.id} className="flex items-start gap-4">
              <img
                src={member.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${member.fullName}`}
                alt={member.fullName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{member.fullName}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <div className="flex gap-3 mt-2">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="text-gray-500 hover:text-gray-700">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedinUrl && (
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.websiteUrl && (
                    <a href={member.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No team members yet</p>
      )}
    </div>
  );
}