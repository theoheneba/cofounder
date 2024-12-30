import React from 'react';
import { useUserFilters } from '../../../hooks/useUserFilters';

export function SubscriptionFilter() {
  const { filters, updateFilter } = useUserFilters();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Subscription Tier
      </label>
      <select
        value={filters.subscriptionTier}
        onChange={(e) => updateFilter('subscriptionTier', e.target.value)}
        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All Tiers</option>
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="enterprise">Enterprise</option>
      </select>
    </div>
  );
}