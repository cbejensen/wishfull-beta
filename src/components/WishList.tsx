import React from 'react';
import { WishCard } from './WishCard';
import { EmptyState } from './EmptyState';
import { useWishlistStore } from '../store/wishlistStore';
import type { User } from '../types';

interface WishListProps {
  currentUser: User;
}

export const WishList: React.FC<WishListProps> = ({ currentUser }) => {
  const wishes = useWishlistStore((state) => state.wishes);
  const isLoading = useWishlistStore((state) => state.isLoading);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishes.map((wish) => (
        <WishCard
          key={wish.id}
          wish={wish}
          isOwner={wish.user_id === currentUser.id}
        />
      ))}
    </div>
  );
};