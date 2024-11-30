import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { AuthForm } from './components/AuthForm';
import { Navigation } from './components/Navigation';
import { AppRoutes } from './routes';
import { useWishlistStore } from './store/wishlistStore';
import type { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const fetchWishes = useWishlistStore((state) => state.fetchWishes);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name,
        });
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      fetchWishes();
    }
  }, [user, fetchWishes]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {user && <Navigation user={user} />}
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!user ? (
            <AuthForm />
          ) : (
            <AppRoutes user={user} />
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;