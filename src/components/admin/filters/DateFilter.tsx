import React from 'react';
import { useUserFilters } from '../../../hooks/useUserFilters';

export function DateFilter() {
  const { filters, updateFilter } = useUserFilters();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Join Date
      </label>
      <select
        value={filters.dateRange}
        onChange={(e) => updateFilter('dateRange', e.target.value)}
        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
    </div>
  );
}