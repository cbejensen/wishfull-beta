import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

interface FriendStore {
  friends: Database['public']['Tables']['friends']['Row'][];
  searchResults: {
    user_id: string;
    email: string;
    name: string;
    friendship_status: Database['public']['Enums']['friendship_status'] | null;
  }[];
  isLoading: boolean;
  error: string | null;
  fetchFriends: () => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  sendFriendRequest: (addresseeId: string) => Promise<void>;
  respondToRequest: (friendshipId: string, accept: boolean) => Promise<void>;
}

export const useFriendStore = create<FriendStore>((set) => ({
  friends: [],
  searchResults: [],
  isLoading: false,
  error: null,

  fetchFriends: async () => {
    set({ isLoading: true });
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { data, error } = await supabase
        .rpc('get_user_friends', {
          user_id: user.data.user.id
        });

      if (error) throw error;
      set({ friends: data || [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  searchUsers: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }

    set({ isLoading: true });
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { data, error } = await supabase
        .rpc('search_users', {
          search_term: query,
          current_user_id: user.data.user.id
        });

      if (error) throw error;
      set({ searchResults: data || [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  sendFriendRequest: async (addresseeId: string) => {
    set({ isLoading: true });
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { error } = await supabase
        .from('friends')
        .insert({
          requester_id: user.data.user.id,
          addressee_id: addresseeId,
          status: 'pending'
        });

      if (error) throw error;
      await useFriendStore.getState().searchUsers(''); // Clear search results
      await useFriendStore.getState().fetchFriends(); // Refresh friends list
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  respondToRequest: async (friendshipId: string, accept: boolean) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase
        .from('friends')
        .update({
          status: accept ? 'accepted' : 'rejected'
        })
        .eq('id', friendshipId);

      if (error) throw error;
      await useFriendStore.getState().fetchFriends();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
