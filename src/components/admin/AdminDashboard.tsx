import React from 'react';
import { Users, Activity, BarChart } from 'lucide-react';
import { UsersList } from './UsersList';
import { SubscriptionStats } from './SubscriptionStats';
import { StartupMetrics } from './StartupMetrics';

export function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <Users className="text-indigo-600 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mt-2">2,451</p>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Startups</h3>
            <Activity className="text-indigo-600 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mt-2">847</p>
          <p className="text-sm text-green-600 mt-2">+5% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <BarChart className="text-indigo-600 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mt-2">$24,500</p>
          <p className="text-sm text-green-600 mt-2">+8% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UsersList />
        <SubscriptionStats />
      </div>
      
      <div className="mt-8">
        <StartupMetrics />
      </div>
    </div>
  );
}