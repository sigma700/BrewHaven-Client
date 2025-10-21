import {create} from "zustand";

export const useBasket = create((set) => ({
  cart: 0,
  addToCart: () => set((state) => ({cart: state.cart + 1})),
  removeFromCart: () => set((state) => ({cart: state.cart - 1})),
  updateCart: (newCarts) => set({bears: newCarts}),
}));
