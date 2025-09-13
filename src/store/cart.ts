import { create } from 'zustand';

type Product = {
  id: number;
  name: string;
  price: number;
};

type CartState = {
  items: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
  removeFromCart: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
}));
