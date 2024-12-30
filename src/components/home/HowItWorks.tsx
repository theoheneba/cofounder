import React from 'react';
import { Users, Target, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Users,
    title: 'Create Profile',
    description: 'Share your skills, experience, and what you\'re looking for in a co-founder.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: Target,
    title: 'Find Matches',
    description: 'Browse profiles and connect with potential co-founders who share your vision.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: Rocket,
    title: 'Start Building',
    description: 'Connect, collaborate, and start building your startup together.',
    color: 'from-indigo-400 to-indigo-600',
  },
];

export function HowItWorks() {
  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Three simple steps to find your perfect co-founder match and start building your dream startup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <div key={step.title} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r ${step.color} rounded-2xl opacity-10"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl mx-auto mb-6 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-4">
                Step {index + 1}
              </span>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}