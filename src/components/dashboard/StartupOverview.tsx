import React from 'react';
import { BarChart, Users, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StartupOverview() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Startup</h2>
        <Link
          to="/startup/edit"
          className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
        >
          Edit Details <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Profile Views</h3>
            <BarChart className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold mt-2">1,234</p>
          <p className="text-sm text-green-600">+12% this week</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Team Size</h3>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold mt-2">4</p>
          <p className="text-sm text-gray-600">Looking for 2 more</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Stage</h3>
            <Rocket className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold mt-2">MVP</p>
          <p className="text-sm text-gray-600">In development</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">Recent Updates</h3>
        <div className="space-y-4">
          {/* Add your recent updates here */}
        </div>
      </div>
    </div>
  );
}