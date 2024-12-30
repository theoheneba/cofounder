import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TaskItemProps {
  title: string;
  description: string;
  completed: boolean;
  href: string;
}

export function TaskItem({ title, description, completed, href }: TaskItemProps) {
  return (
    <Link
      to={href}
      className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="mt-1">
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300" />
        )}
      </div>
      <div>
        <h3 className={`font-medium ${completed ? 'text-gray-500' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className={`text-sm ${completed ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>
    </Link>
  );
}