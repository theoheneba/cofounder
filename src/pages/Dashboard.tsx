import { useState } from 'react';
import { MatchCard } from '@/components/dashboard/match-card';
import { FilterSidebar } from '@/components/dashboard/filter-sidebar';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';

const mockMatches = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Technical Co-Founder',
    matchPercentage: 95,
    skills: ['React', 'Node.js', 'AWS', 'System Design'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    location: 'San Francisco, CA',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Business Co-Founder',
    matchPercentage: 88,
    skills: ['Marketing', 'Sales', 'Strategy', 'Finance'],
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    location: 'New York, NY',
  },
];

export function DashboardPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Potential Matches</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gray-100' : ''}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-gray-100' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-8 flex">
          <FilterSidebar onFilterChange={() => {}} />
          <div className="ml-8 flex-1">
            <div
              className={
                viewMode === 'grid'
                  ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                  : 'space-y-6'
              }
            >
              {mockMatches.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}