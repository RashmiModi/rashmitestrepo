'use client';

import { useCart } from '@/app/context/CartContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'; // Import Clerk user

export default function CartClient() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { user, isLoaded } = useUser(); // Clerk user data

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isLoaded) return null; // Wait for user to load

  const grandTotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const handlePlaceOrder = () => {
    const email = user?.primaryEmailAddress?.emailAddress || '';
    const phone = user?.phoneNumbers?.[0]?.phoneNumber || '';

    // Navigate to checkout page with query params
    router.push(`/checkout?amount=${grandTotal}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`);
  };

  return (
    <div className="p-8">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => {
              const subtotal = item.price * item.quantity;
              return (
                <li key={item.id} className="flex items-center justify-between p-4 border-b ml-100 mr-100">
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.productname}</span>
                    <span className="text-black-600">Price: ₹{item.price.toFixed(2)}</span>
                    <span className="text-black-800 font-medium">Subtotal: ₹{(subtotal).toFixed(2)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="px-2">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Grand Total */}
          <div className="text-right mt-6">
            <h2 className="text-xl font-bold mb-4">Grand Total: ₹{grandTotal.toFixed(2)}</h2>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
