'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPinIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string, location: string, category: string) => void;
  initialLocation?: string;
}

export default function SearchBar({ onSearch, initialLocation }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState(initialLocation || '');

  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
    }
  }, [initialLocation]);

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!location.trim()) {
      alert('Please enter a location to search.');
      return;
    }
    onSearch(searchTerm, location, 'all');
  };

  // const clearSearch = () => { // Commented out as it's unused
  //   setSearchTerm('');
  //   setCategory('all');
  //   onSearch('', location, 'all');
  // };

  return (
    <form onSubmit={handleSearch} className="p-6 bg-card border rounded-lg shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-5 flex flex-col gap-1.5">
          <label htmlFor="searchTerm" className="text-sm font-medium text-muted-foreground pl-1">What are you looking for?</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="searchTerm"
              type="text"
              placeholder="Pizza, sushi, tacos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-base rounded-md"
            />
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col gap-1.5">
          <label htmlFor="location" className="text-sm font-medium text-muted-foreground pl-1">Where?</label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="location"
              type="text"
              placeholder="New York, Brooklyn, 75001..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-base rounded-md"
              required
            />
          </div>
        </div>

        <div className="md:col-span-2 flex items-end">
          <Button type="submit" className="w-full py-3 text-base rounded-md h-[46px]">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
} 