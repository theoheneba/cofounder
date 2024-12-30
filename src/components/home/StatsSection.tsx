import React from 'react';
import { Users, Rocket, Globe, Star } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Active Founders',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: Rocket,
    value: '500+',
    label: 'Successful Matches',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: Globe,
    value: '50+',
    label: 'Countries',
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Founder Rating',
    color: 'from-pink-400 to-pink-600',
  },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
      {stats.map((stat) => (
        <div key={stat.label} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-6">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}