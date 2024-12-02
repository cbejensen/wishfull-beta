import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { WishList } from '../components/WishList';
import { AddWishForm } from '../components/AddWishForm';
import { FriendsPage } from '../components/FriendsPage';
import type { User } from '../types';

interface AppRoutesProps {
  user: User;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<WishList currentUser={user} />} />
      <Route path="/add" element={<AddWishForm />} />
      <Route path="/friends" element={<FriendsPage currentUser={user} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};