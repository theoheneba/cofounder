import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const tasks = [
  { id: 1, title: 'Complete your profile', completed: false },
  { id: 2, title: 'Upload pitch deck', completed: false },
  { id: 3, title: 'Add startup details', completed: false },
  { id: 4, title: 'Connect with co-founders', completed: false },
];

export function TaskList() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 mr-3" />
            )}
            <span className={task.completed ? 'text-gray-500 line-through' : ''}>
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}