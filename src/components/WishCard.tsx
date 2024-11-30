import React from 'react';
import { ExternalLink, Gift } from 'lucide-react';
import type { Wish } from '../types';
import { useWishlistStore } from '../store/wishlistStore';
import { PriorityDots } from './PriorityDots';

interface WishCardProps {
  wish: Wish;
  isOwner: boolean;
}

export const WishCard: React.FC<WishCardProps> = ({ wish, isOwner }) => {
  const fulfillWish = useWishlistStore((state) => state.fulfillWish);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">{wish.title}</h3>
        <PriorityDots priority={wish.priority} />
      </div>
      
      {wish.description && (
        <p className="mt-2 text-gray-600">{wish.description}</p>
      )}
      
      <div className="mt-4 flex items-center justify-between">
        {wish.price && (
          <span className="text-lg font-medium text-green-600">
            ${wish.price.toFixed(2)}
          </span>
        )}
        <div className="flex space-x-2">
          {wish.link && (
            <a
              aria-label='open link to product'
              href={wish.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          {!isOwner && !wish.fulfilled && (
            <button
              aria-label="fulfill wish"
              onClick={() => fulfillWish(wish.id)}
              className="text-purple-500 hover:text-purple-600"
            >
              <Gift className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};