import React from 'react';
import { AddWishForm } from './AddWishForm';
import { WishList } from './WishList';
import type { User } from '../types';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Wish</h2>
        <AddWishForm />
      </div>

      <WishList currentUser={user} />
    </div>
  );
};