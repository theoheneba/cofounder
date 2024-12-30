import React from 'react';

interface StepCardProps {
  step: string;
  title: string;
  description: string;
}

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="text-center">
      <div className="inline-block bg-indigo-600 text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {step}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}