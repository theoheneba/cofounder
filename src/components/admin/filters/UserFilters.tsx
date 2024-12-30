import React from 'react';
import { Filter } from 'lucide-react';
import { SubscriptionFilter } from './SubscriptionFilter';
import { DateFilter } from './DateFilter';
import { StatusFilter } from './StatusFilter';

export function UserFilters() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700">
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filters</span>
      </div>
      
      <div className="space-y-4">
        <SubscriptionFilter />
        <StatusFilter />
        <DateFilter />
      </div>
    </div>
  );
}