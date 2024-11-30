import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gift, Plus, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';
import { globals } from '../contants';

interface NavigationProps {
  user: User;
}

export const Navigation: React.FC<NavigationProps> = ({ user }) => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <Gift className="w-8 h-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                {globals.appName}
              </span>
            </Link>

            <div className="hidden sm:flex sm:space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/'
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Wishes
              </Link>
              <Link
                to="/add"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/add'
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Add Wish
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-2">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-2 gap-1 p-2">
          <Link
            to="/"
            className={`flex items-center justify-center p-3 rounded-md ${
              location.pathname === '/'
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-600'
            }`}
          >
            <Gift className="w-5 h-5" />
            <span className="ml-2">My Wishes</span>
          </Link>
          <Link
            to="/add"
            className={`flex items-center justify-center p-3 rounded-md ${
              location.pathname === '/add'
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-600'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="ml-2">Add Wish</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
