import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load cart:", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === newItem.productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
