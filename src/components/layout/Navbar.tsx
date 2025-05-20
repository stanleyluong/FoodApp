'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react'; // Using lucide-react for icons, commonly used with shadcn/ui
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?term=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Optionally clear the search bar after submission
    }
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            FoodApp
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
        </div>
        <div className="flex-1 max-w-xl ml-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border"
            />
          </form>
        </div>
      </div>
    </nav>
  );
} 