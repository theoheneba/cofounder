import React from 'react';
import { Users, Eye, MessageSquare, Star } from 'lucide-react';
import type { DashboardStats as Stats } from '../../../hooks/useDashboardStats';

interface DashboardStatsProps {
  stats: Stats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    {
      label: 'Profile Views',
      value: stats.profileViews,
      change: stats.trends.profileViews,
      trend: 'up',
      icon: Eye,
    },
    {
      label: 'Connections',
      value: stats.connections,
      change: stats.trends.connections,
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Messages',
      value: stats.messages,
      change: stats.trends.messages,
      trend: 'up',
      icon: MessageSquare,
    },
    {
      label: 'Match Score',
      value: `${stats.matchScore}%`,
      change: stats.trends.matchScore,
      trend: 'up',
      icon: Star,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <stat.icon className="w-5 h-5 text-indigo-600" />
            <span className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
          <p className="text-gray-600 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}