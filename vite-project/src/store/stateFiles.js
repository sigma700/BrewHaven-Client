import {CardTravelRounded} from "@mui/icons-material";
import {create} from "zustand";

export const useBasket = create((set) => ({
  success: false,
  isLoading: false,
  error: false,
  cart: 0,
  addToCart: () =>
    set((state) => ({cart: state.cart + 1, success: true, isLoading: false})),
  removeFromCart: () => set((state) => ({cart: state.cart - 1})),
  updateCart: (newCarts) =>
    set({CardTravelRounded: newCarts}, console.log("Made the changes ")),
  resetCart: () => set((state) => ({cart: state.cart * 0})),
}));
