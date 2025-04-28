
'use client'
import { useCart } from '@/app/context/CartContext';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user, isLoaded } = useUser(); // Get user data from Clerk

  const [userInfo, setUserInfo] = useState({
    email: '',
    phone: '',
    fullname:'',
  });
  const router = useRouter();
  // Ensure the component only renders after the user data is loaded
  useEffect(() => {
    if (isLoaded && user) {
      setUserInfo({
        email: user.primaryEmailAddress?.emailAddress || '', // Use `emailAddress` field
        phone: user?.phoneNumbers?.[0]?.phoneNumber || '', // Access phone from publicMetadata
        fullname: user.fullName || '',
      });
    }
  }, [isLoaded, user]);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Prevent rendering until the user data is loaded to avoid hydration errors
  if (!isLoaded) {
    return <div>Loading...</div>; // Render a loading state while the data is loading
  }
  const handleCheckoutrazore = async () => {
    const amount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // in paise
  
    const options = {
      key: "rzp_test_lvI7UzEaP8GaLG", // replace with your Razorpay key
      amount: amount,
      currency: "INR",
      name: "ECOM",
      description: "Purchase Products",
      image: "https://yourstore.com/logo.png", // optional
      handler: function (response: any) {
        console.log(response);
        alert("Payment Successful!");
        router.push('/shop');
        clearCart();  
      },
      prefill: {
        
         "contact":userInfo.phone, 
          "name": userInfo.fullname,  
         "email": userInfo.email
       },
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleUserInfoChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Street</label>
            <input
              type="text"
              name="street"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="city"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Zip Code</label>
            <input
              type="text"
              name="zip"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cart Details</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>{item.productname}</span>
              <span>{item.quantity} x ₹{item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold mt-4">
          <span>Subtotal</span>
          <span>₹{calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleCheckoutrazore}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
