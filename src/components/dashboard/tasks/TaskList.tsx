import React from 'react';
import { useOnboardingSteps } from '../../../hooks/useOnboardingSteps';
import { TaskItem } from './TaskItem';

const getTaskHref = (taskId: string) => {
  switch (taskId) {
    case 'profile':
      return '/onboarding/profile';
    case 'startup':
      return '/onboarding/startup';
    case 'connect':
      return '/browse';
    default:
      return '/dashboard';
  }
};

export function TaskList() {
  const { steps, loading } = useOnboardingSteps();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm animate-pulse">
        <div className="p-6 border-b">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Getting Started</h2>
      </div>
      <div className="p-6 space-y-4">
        {steps.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            href={getTaskHref(task.id)}
          />
        ))}
      </div>
    </div>
  );
}