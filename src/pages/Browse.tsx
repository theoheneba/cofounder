import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/browse/SearchBar';
import { Filters } from '../components/browse/Filters';
import { ChatWindow } from '../components/chat/ChatWindow';
import { CoFounderCard } from '../components/browse/CoFounderCard';
import { useProfiles } from '../hooks/useProfiles';
import type { User } from '../types';

export function Browse() {
  const [activeChat, setActiveChat] = useState<User | null>(null);
  const { profiles, loading } = useProfiles();
  
  const handleSearch = (query: string) => {
    console.log('Searching:', query);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Find Co-Founders</h1>
        <Link to="/profile" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Complete Your Profile
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <Filters />
        </div>

        <div className="col-span-9">
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {profiles.map((profile) => (
              <CoFounderCard
                key={profile.id}
                founder={profile}
                onConnect={() => {}}
                onChat={() => setActiveChat(profile)}
              />
            ))}
          </div>
        </div>
      </div>

      {activeChat && (
        <ChatWindow
          recipient={activeChat}
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  );
}