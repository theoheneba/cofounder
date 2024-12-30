import React from 'react';
import { DashboardStats } from '../components/dashboard/stats/DashboardStats';
import { MatchList } from '../components/dashboard/matches/MatchList';
import { TaskList } from '../components/dashboard/tasks/TaskList';
import { LoadingState } from '../components/dashboard/LoadingState';
import { ErrorState } from '../components/dashboard/ErrorState';
import { useDashboardStats } from '../hooks/useDashboardStats';

export function Dashboard() {
  const { stats, loading, error } = useDashboardStats();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening.</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Browse Co-Founders
          </button>
        </div>

        <div className="space-y-8">
          <DashboardStats stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MatchList />
            </div>
            <div>
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}