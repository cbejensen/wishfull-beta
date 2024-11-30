export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Wish {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  link?: string;
  price?: number;
  priority: number;
  fulfilled: boolean;
  created_at: string;
}

export interface WishlistStore {
  wishes: Wish[];
  isLoading: boolean;
  error: string | null;
  fetchWishes: () => Promise<void>;
  addWish: (wish: Omit<Wish, 'id' | 'user_id' | 'fulfilled' | 'createdAt'>) => Promise<void>;
  fulfillWish: (wishId: string) => Promise<void>;
}