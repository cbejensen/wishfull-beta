import { Tables } from './database';

export interface User {
  email: string;
  id: string;
  name: string;
}

export interface WishlistStore {
  wishes: Tables<'wishes'>[];
  isLoading: boolean;
  error: string | null;
  fetchWishes: () => Promise<void>;
  addWish: (wish: Omit<Tables<'wishes'>, 'id' | 'user_id' | 'fulfilled' | 'created_at'>) => Promise<void>;
  fulfillWish: (wishId: string) => Promise<void>;
}

export * from './database'