
'use client';
//import { useSession } from 'next-auth/react'; // Importing next-auth session hook
import { useCart } from '@/app/context/CartContext'; // Your CartContext hook
import Example from '@/app/homepage/navbar'; // Navbar component

function NavbarWrapper() {
  const { cartItems, addToCart } = useCart();
  //const { data: session, status } = useSession(); // Fetching session data
 // Provide default values for name and email if session data is unavailable
 const finalUser = {
  name: 'Guest',
  email: 'guest@example.com',
};

// Explicitly check and fallback to valid email if undefined


return <Example cartCount={cartItems.length} onAddToCart={addToCart} users={finalUser} />;
}
export default NavbarWrapper;