import React from 'react';
import { useStartupMetrics } from '../../hooks/useStartupMetrics';
import { BarChart2, PieChart, TrendingUp } from 'lucide-react';

export function StartupMetrics() {
  const { metrics, loading } = useStartupMetrics();

  if (loading) return <div>Loading metrics...</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Startup Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">Active Startups</h3>
            <BarChart2 className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold mt-2">{metrics?.activeStartups || 0}</p>
          <p className="text-sm text-green-600">+8% from last month</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">Avg Team Size</h3>
            <PieChart className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold mt-2">{metrics?.averageTeamSize || 0}</p>
          <p className="text-sm text-green-600">+2 from last month</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">Growth Rate</h3>
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold mt-2">{metrics?.growthRate || 0}%</p>
          <p className="text-sm text-green-600">+5% from last month</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-4">Startup Stages</h3>
        <div className="space-y-4">
          {Object.entries(metrics?.stageDistribution || {}).map(([stage, percentage]) => (
            <div key={stage}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium capitalize">{stage}</span>
                <span className="text-sm text-gray-600">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-4">Industry Distribution</h3>
        <div className="space-y-4">
          {Object.entries(metrics?.industryDistribution || {}).map(([industry, percentage]) => (
            <div key={industry}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{industry}</span>
                <span className="text-sm text-gray-600">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}