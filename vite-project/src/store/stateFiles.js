// store.js
import {create} from "zustand";
import {products} from "../pages/Landing";

export const useBasket = create((set, get) => ({
  cart: [],
  success: false,
  isLoading: false,

  addToCart: (id) =>
    set((state) => {
      // Find the product from your products array
      const productToAdd = products.find((product) => product.id === id);

      if (!productToAdd) {
        return {
          success: false,
          error: "Product not found",
          isLoading: false,
        };
      }

      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        // Increase quantity if item exists
        const updatedCart = state.cart.map((item) =>
          item.id === id ? {...item, quantity: item.quantity + 1} : item
        );
        return {
          cart: updatedCart,
          success: true,
          isLoading: false,
        };
      } else {
        // Add new item to cart
        const newCartItem = {
          ...productToAdd,
          quantity: 1,
          addedAt: new Date().toISOString(),
        };

        return {
          cart: [...state.cart, newCartItem],
          success: true,
          isLoading: false,
        };
      }
    }),

  // Additional useful cart methods
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id ? {...item, quantity: Math.max(0, quantity)} : item
        )
        .filter((item) => item.quantity > 0), // Remove items with 0 quantity
    })),

  clearCart: () => set({cart: []}),

  // Getters
  getTotalItems: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().cart.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    ),
}));
