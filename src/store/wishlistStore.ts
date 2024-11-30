import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Wish, WishlistStore } from '../types';

export const useWishlistStore = create<WishlistStore>((set) => ({
  wishes: [],
  isLoading: false,
  error: null,

  fetchWishes: async () => {
    set({ isLoading: true });
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;
      
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .eq('user_id', user.data.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ wishes: data as Wish[], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  addWish: async (wish) => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) return;

    try {
      const { error } = await supabase.from('wishes').insert([
        {
          ...wish,
          user_id: user.data.user.id,
          fulfilled: false,
        },
      ]);

      if (error) throw error;
      useWishlistStore.getState().fetchWishes();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fulfillWish: async (wishId) => {
    try {
      const { error } = await supabase
        .from('wishes')
        .update({ fulfilled: true })
        .eq('id', wishId);

      if (error) throw error;
      useWishlistStore.getState().fetchWishes();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));