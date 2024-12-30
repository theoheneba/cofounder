import React from 'react';
import { useRoadmap } from '../../hooks/useRoadmap';
import { Calendar, CheckCircle2, Clock, Loader2 } from 'lucide-react';

interface StartupRoadmapProps {
  startupId: string;
}

export function StartupRoadmap({ startupId }: StartupRoadmapProps) {
  const { roadmap, loading } = useRoadmap(startupId);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Roadmap</h2>
      
      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : roadmap?.length ? (
        <div className="space-y-6">
          {roadmap.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                item.status === 'completed' ? 'bg-green-100' :
                item.status === 'in-progress' ? 'bg-blue-100' :
                'bg-gray-100'
              }`}>
                {item.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : item.status === 'in-progress' ? (
                  <Clock className="w-5 h-5 text-blue-600" />
                ) : (
                  <Calendar className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {item.dueDate && (
                  <p className="text-sm text-gray-500 mt-1">
                    Due: {new Date(item.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No roadmap items yet</p>
      )}
    </div>
  );
}