import React, { useState } from 'react';
import { WishCard } from './WishCard';
import { EmptyState } from './EmptyState';
import { useWishlistStore } from '../store/wishlistStore';
import type { User } from '../types';
import { ArrowUpDown } from 'lucide-react';

interface WishListProps {
  currentUser: User;
}

type SortOption = 'priority' | 'price' | 'created';
type SortDirection = 'asc' | 'desc';

export const WishList: React.FC<WishListProps> = ({ currentUser }) => {
  const wishes = useWishlistStore((state) => state.wishes);
  const isLoading = useWishlistStore((state) => state.isLoading);
  const [sortBy, setSortBy] = useState<SortOption>('created');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('desc');
    }
  };

  const sortedWishes = [...wishes].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortBy) {
      case 'priority':
        return (b.priority - a.priority) * modifier;
      case 'price': {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return (priceB - priceA) * modifier;
      }
      default:
        return modifier * (new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (wishes.length === 0) {
    return <EmptyState />;
  }

  const getSortButtonClass = (option: SortOption) =>
    `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
      sortBy === option
        ? 'bg-purple-100 text-purple-600'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => toggleSort('priority')}
          className={getSortButtonClass('priority')}
        >
          Priority
          <ArrowUpDown className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleSort('price')}
          className={getSortButtonClass('price')}
        >
          Price
          <ArrowUpDown className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWishes.map((wish) => (
          <WishCard
            key={wish.id}
            wish={wish}
            isOwner={wish.user_id === currentUser.id}
          />
        ))}
      </div>
    </div>
  );
};