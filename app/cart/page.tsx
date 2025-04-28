
 // Import the client component
import CartClient from "./CartClient";


export default function CartPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <CartClient /> {/* Client side logic */}
    </div>
  );
}
