import React from 'react';
import { useUserFilters } from '../../../hooks/useUserFilters';

export function StatusFilter() {
  const { filters, updateFilter } = useUserFilters();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Status
      </label>
      <select
        value={filters.status}
        onChange={(e) => updateFilter('status', e.target.value)}
        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="suspended">Suspended</option>
      </select>
    </div>
  );
}