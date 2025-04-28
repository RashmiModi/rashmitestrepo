'use client';
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Product } from '@prisma/client';

interface CartItem extends Product {
  quantity: number;  // Add quantity to each product in the cart
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void; // Update quantity function
  clearCart: () => void,
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Product exists in the cart, update the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Product doesn't exist in the cart, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  const clearCart = () => {
    setCartItems([]);
  };
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) => {
      return prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};