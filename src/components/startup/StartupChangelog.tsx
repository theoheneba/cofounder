import React from 'react';
import { useChangelog } from '../../hooks/useChangelog';
import { Star, Wrench, Bug } from 'lucide-react';

interface StartupChangelogProps {
  startupId: string;
}

export function StartupChangelog({ startupId }: StartupChangelogProps) {
  const { changelog } = useChangelog(startupId);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Changelog</h2>
      
      {changelog?.length ? (
        <div className="space-y-6">
          {changelog.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                item.type === 'feature' ? 'bg-purple-100' :
                item.type === 'improvement' ? 'bg-blue-100' :
                'bg-red-100'
              }`}>
                {item.type === 'feature' ? (
                  <Star className="w-5 h-5 text-purple-600" />
                ) : item.type === 'improvement' ? (
                  <Wrench className="w-5 h-5 text-blue-600" />
                ) : (
                  <Bug className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No changelog entries yet</p>
      )}
    </div>
  );
}