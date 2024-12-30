import React from 'react';
import { useSubscriptionStats } from '../../hooks/useSubscriptionStats';
import { CreditCard, TrendingUp, Users } from 'lucide-react';

export function SubscriptionStats() {
  const { stats, loading } = useSubscriptionStats();

  if (loading) return <div>Loading stats...</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Subscription Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">Active Subscriptions</h3>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold mt-2">{stats?.activeSubscriptions || 0}</p>
          <p className="text-sm text-green-600">+5% from last month</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">Monthly Revenue</h3>
            <CreditCard className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold mt-2">${stats?.monthlyRevenue || 0}</p>
          <p className="text-sm text-green-600">+12% from last month</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold mt-2">{stats?.conversionRate || 0}%</p>
          <p className="text-sm text-green-600">+2% from last month</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-4">Subscription Distribution</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Free Plan</span>
              <span className="text-sm text-gray-600">{stats?.freePlanPercentage || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-500 h-2 rounded-full" 
                style={{ width: `${stats?.freePlanPercentage || 0}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Pro Plan</span>
              <span className="text-sm text-gray-600">{stats?.proPlanPercentage || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-500 h-2 rounded-full" 
                style={{ width: `${stats?.proPlanPercentage || 0}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Enterprise Plan</span>
              <span className="text-sm text-gray-600">{stats?.enterprisePlanPercentage || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full" 
                style={{ width: `${stats?.enterprisePlanPercentage || 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}